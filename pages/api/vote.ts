import { POLL_GET_TYPE, USER_CHECK_TOKEN_ROLE, VOTE_ADD } from "gql";
import { query, mutation } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";

const validateVote = (vote: Set<Number>, pollType: any): Boolean => {
  if (pollType.minVote > vote.size || pollType.maxVote < vote.size) {
    return false;
  }
  const options = pollType.options.map((o: any) => o.value);
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
  const userId = req.headers["user-id"];
  const role = req.headers["user-role"];
  const token = req.headers["user-token"];
  if (!(userId && role && token)) {
    return res.status(400).send({ message: "Missing headers" });
  }

  // Validate user
  const { error } = await query(USER_CHECK_TOKEN_ROLE, {
    token,
    role,
  });
  if (error) {
    return res.status(400).send({ message: "Invalid id" });
  }

  // Validate vote
  const { pollId, value }: { pollId: string; value: Set<Number> } =
    req.body.input.vote;
  const vote = new Set(value);
  const pollType = await query(POLL_GET_TYPE, {
    pollId,
  });
  if (!validateVote(vote, pollType.data.poll.content.pollType)) {
    return res.status(400).send({ message: "Invalid vote" });
  }

  // Add vote
  const parsedValue = `{${value}}`;
  try {
    await mutation(VOTE_ADD, {
      userId,
      pollId,
      value: parsedValue,
    });
  } catch (err) {
    return res.status(400).send({ message: JSON.stringify(err) });
  }
  return res.json({
    pollId,
  });
}
