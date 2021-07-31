import { EVENT_CHECK_VOTE, USER_CHECK_TOKEN_ROLE } from "gql";
import { query } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.body.session_variables["x-hasura-user-id"];

  // Check if voted
  const eventId: string = req.body.input.eventId;
  const {
    data: { event },
  } = await query(EVENT_CHECK_VOTE, {
    id: eventId,
    userId,
  });

  // Return pollId
  return res.json({
    pollId: event.poll.id,
    canVote: event.poll.votes.length == 0,
  });
}
