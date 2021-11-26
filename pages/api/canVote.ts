import { query, resolved } from "gql";
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

  // Check if voted
  const eventId: string = req.body.input.eventId;
  const event = await resolved(() => query.events_by_pk({ id: eventId }));
  const admissions = await resolved(() =>
    event
      ?.admissions({ where: { identity: { user: { id: { _eq: userId } } } } })
      ?.map(({ voting, checkedIn }) => ({ voting, checkedIn }))
  );
  const votes = await resolved(() => event?.poll?.votes({ where: { userId: { _eq: userId } } }));

  if (!votes || !admissions) return;

  // Return pollId
  return res.json({
    pollId: event?.poll?.id,
    active: event?.poll?.active,
    canVote:
      event?.poll?.active &&
      votes.length == 0 &&
      admissions.length > 0 &&
      admissions[0].voting &&
      admissions[0].checkedIn,
  });
}
