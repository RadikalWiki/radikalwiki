import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return res.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA,
    env: process.env.NODE_ENV,
  });
}

export default handler;