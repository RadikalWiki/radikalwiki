import { EVENT_CHECK_VOTE } from "gql";
import { query } from "hooks";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose/jwt/verify";
import { createSecretKey } from "crypto";

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
