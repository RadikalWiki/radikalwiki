import { NextApiRequest, NextApiResponse } from "next";
import { query, resolved } from "gql"
import { getArrayFields } from 'gqless';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  resolved(() =>
    query.users().map(user => ({ ...user }))
  ).then((data) => res.json(data))
}
