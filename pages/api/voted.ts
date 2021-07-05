import { EVENT_CHECK_VOTE, USER_CHECK_TOKEN_ROLE } from "gql";
import { query } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";

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

  // Check if voted
  const {
    data: { event },
  } = await query(EVENT_CHECK_VOTE, {
    userId,
  });

  // Return pollId
  return res.json({
    pollId: event.poll.id,
  });
}
