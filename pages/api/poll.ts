import { POLL_RESULT, USER_CHECK_TOKEN_ROLE } from "gql";
import { query } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";

const parseData = (poll: any): number[] => {
  const values: number[] = poll.content.pollType.options.map(() => 0);
  for (const vote of poll.votes) {
    for (const index of vote.value) {
      values[index] += 1;
    }
  }

  return values;
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
  const user = await query(USER_CHECK_TOKEN_ROLE, {
    token,
    role,
  });
  if (user.error) {
    return res.status(400).send({ message: "Invalid id" });
  }

  const { body: { input: { pollId } } = {} } = req;
  const { data: { poll } = {} } = await query(POLL_RESULT, { pollId });

  const keys = poll.content.pollType.options.map((opt: any) => opt.name);
  const values = poll.active && role != "admin" ? null : parseData(poll);
  const count = poll.total.aggregate.count;

  return res.json({
    name: poll.content.name,
    id: poll.content.id,
    keys,
    values,
    count,
  });
}
