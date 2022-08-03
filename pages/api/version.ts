import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.json({
    commit: process.env.RW_COMMIT_HASH,
    env: process.env.NODE_ENV,
  });
}
