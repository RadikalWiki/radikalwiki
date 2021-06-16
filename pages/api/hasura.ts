import { query } from "hooks";
import { USER_CHECK_TOKEN_ROLE } from "gql";
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

  const { error } = await query(USER_CHECK_TOKEN_ROLE, {
    token,
    role,
  });
  if (error) {
    return res.status(400).json({ error: "invalid id" });
  }

  const auth = {
    "X-Hasura-User-Id": userId,
    "X-Hasura-Role": role,
    "X-Hasura-Is-Owner": "false",
    "Cache-Control": "max-age=600",
  };
  return res.status(200).json(auth);
}
