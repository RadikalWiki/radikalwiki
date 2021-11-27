import { query, mutation, resolved } from "gql";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose/jwt/verify";
import { createSecretKey } from "crypto";

const validateVote = (vote: Set<number>, poll: any): Boolean => {
  // Handle blank
  const [first] = vote;
  const options = [...Array(poll?.options.length).keys()];
  const blank = poll.options[options.length - 1];
  if (vote.size == 1 && first == blank) {
    return true;
  }
  if (vote.size > 1 && [...vote.values()].includes(blank)) {
    return false;
  }
  if (poll.minVote > vote.size || poll.maxVote < vote.size) {
    return false;
  }
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
  //const { data } = await query(POLL_CHECK_VOTE, {
  //  id: pollId,
  //  userId,
  //});
  const poll = await resolved(() => query.polls_by_pk({ id: pollId }));
  if (!poll) {
    return res
      .status(401)
      .send({ message: `Could find poll with id: ${pollId}` });
  }
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
  const admissions = await resolved(() =>
    poll.content?.folder?.event
      ?.admissions({ where: { identity: { user: { id: { _eq: userId } } } } })
      ?.map(({ voting, checkedIn }) => ({ voting, checkedIn }))
  );
  if (!admissions || admissions.length == 0 || !admissions[0].voting) {
    return res.status(401).send({ message: "Not allowed to vote" });
  }
  if (!admissions[0].checkedIn) {
    return res.status(401).send({ message: "Not checked in" });
  }

  // Add vote
  const parsedValue = `{${value}}`;
  try {
    await resolved(() =>
      mutation.insert_votes_one({
        object: {
          userId,
          pollId,
          value: parsedValue,
        },
      })
    );
  } catch (err) {
    return res.status(400).send({ message: JSON.stringify(err) });
  }
  return res.json({
    pollId,
  });
}
