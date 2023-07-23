import { resolve } from 'gql';
import { useEffect, useState } from 'react';
import usePath from './hooks/usePath';

const toId = async (
  path: string[],
  parentId?: string
): Promise<string | undefined> => {
  if (path.length == 0) return parentId
  const where = parentId
    ? { parentId: { _eq: parentId }, key: { _eq: path.at(0) } }
    : { parentId: { _is_null: true } };
  const id = await resolve(({ query }) => query.nodes({ where }).at(0)?.id);

  return toId(parentId ? path.slice(1) : path, id);
};

const fromId = async (id?: string | null): Promise<string[]> => {
  if (!id) return [];
  return await resolve(async ({ query }) => {
    const node = query.node({ id });
    const parentId = node?.parentId;
    const key = node?.key;
    if (!parentId) return [];
    return (await fromId(parentId)).concat(key ? [key] : []);
  });
};

const useId = () => {
  const [id, setId] = useState<string | undefined>()
  const path = usePath();

  useEffect(() => {
    if (path.length)
      toId(path).then(setId)
  }, [path])
  return id
}

export { toId, fromId, useId };
