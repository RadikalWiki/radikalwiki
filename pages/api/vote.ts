import { POLL_GET_TYPE, USER_CHECK_TOKEN_ROLE, VOTE_ADD } from "gql";
import { query, mutation } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "utils/nhost";

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
  const userId = req.body.session_variables["x-hasura-user-id"];

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
