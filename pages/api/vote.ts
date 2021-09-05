import { POLL_CHECK_VOTE, VOTE_ADD, EVENT_CHECK_VOTE } from "gql";
import { query, mutation } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose/jwt/verify";
import { createSecretKey } from "crypto";

const validateVote = (vote: Set<number>, poll: any): Boolean => {
  // Handle blank
  const [first] = vote;
  if (vote.size == 1 && first == poll.options[poll.options.length - 1]) {
    return true;
  }

  if (poll.minVote > vote.size || poll.maxVote < vote.size) {
    return false;
  }
  for (const v of vote.values()) {
    if (!poll.options.includes(v)) {
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
  const jwk = createSecretKey(
    Buffer.from(process.env.JWT_KEY as string, "hex")
  );

  // Verify token
  let payload: any;
  try {
    ({ payload } = await jwtVerify(jwt, jwk, { algorithms: ["HS256"] }));
  } catch (e: any) {
    return res.status(401).send({ message: e.message });
  }
  const userId = payload["https://hasura.io/jwt/claims"]["x-hasura-user-id"];

  // Validate vote
  const { pollId, value }: { pollId: string; value: Set<number> } =
    req.body.input.vote;
  const vote = new Set(value);
  const { data } = await query(POLL_CHECK_VOTE, {
    id: pollId,
    userId,
  });
  const poll = data.poll;
  if (!validateVote(vote, poll)) {
    return res.status(400).send({ message: "Invalid vote" });
  }

  // Check if voted
  if (!poll.active) {
    return res.status(401).send({ message: "Poll not active" });
  }
  if (poll.votes.length !== 0) {
    return res.status(401).send({ message: "Already voted" });
  }
  if (poll.content.folder.event.admissions.length == 0) {
    return res.status(401).send({ message: "Not allowed to vote" });
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
