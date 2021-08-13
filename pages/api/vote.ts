import { POLL_GET_TYPE, VOTE_ADD } from "gql";
import { query, mutation } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose/jwt/verify";
import { createSecretKey } from "crypto";

const validateVote = (vote: Set<number>, content: any): Boolean => {
  if (content.minVote > vote.size || content.maxVote < vote.size) {
    return false;
  }
  const aggregate = content.children_aggregate.aggregate;
  const count = content.folder.mode == "candidates" ? aggregate.count + 1 : 3;
  const options = [...Array(count).keys()];
  for (const v of vote.values()) {
    if (!options.includes(v)) {
      return false;
    }
  }
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get jwt
  const auth = req.headers.authorization as string;
  if (!auth) {
    return res.status(400).send({ message: "Missing Authorization header" });
  }
  const jwt = auth?.split(" ")[1];
  if (!jwt) {
    return res.status(400).send({ message: "Missing token" });
  }
  
  // Get secret
  const jwk = createSecretKey(Buffer.from(process.env.JWT_KEY as string));

  // Verify token
  let payload: any;
  try {
    ({ payload } = await jwtVerify(jwt, jwk, { algorithms: ["HS256"]}));
  } catch (e: any) {
    return res.status(401).send({ message: e.message });
  }
  const userId = payload["https://hasura.io/jwt/claims"]["x-hasura-user-id"] 

  // Validate vote
  const { pollId, value }: { pollId: string; value: Set<number> } =
    req.body.input.vote;
  const vote = new Set(value);
  const pollType = await query(POLL_GET_TYPE, {
    id: pollId,
  });
  if (!validateVote(vote, pollType.data.poll.content)) {
    return res.status(400).send({ message: "Invalid vote" });
  }

  // Add vote
  const parsedValue = `{${value}}`;
  try {
    await mutation(VOTE_ADD, {
      object: {
        userId,
        pollId,
        value: parsedValue,
      },
    });
  } catch (err) {
    return res.status(400).send({ message: JSON.stringify(err) });
  }
  return res.json({
    pollId,
  });
}
