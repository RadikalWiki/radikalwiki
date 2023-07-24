import { Maybe, resolve } from 'gql';
import { useEffect, useState } from 'react';
import { usePath } from 'hooks';
import { useAuthenticationStatus } from '@nhost/nextjs';

const toId = async (
  path: string[],
  parentId?: string
): Promise<string | undefined> => {
  if (path.length == 0 && parentId) return parentId;

  const where = parentId
    ? { parentId: { _eq: parentId }, key: { _eq: path.at(0) } }
    : { parentId: { _is_null: true } };
  const id = await resolve(({ query }) => {
    const node = query.nodes({ where })?.[0];
    if (node) return node.id;
  });

  return toId(parentId ? path.slice(1) : path, id);
};

const toContextId = async (
  path: string[],
  parentId?: string
): Promise<Maybe<string | undefined>> => {
  if (path.length == 0 && parentId)
    return await resolve(
      ({ query }) => query.node({ id: parentId })?.contextId
    );

  const where = parentId
    ? { parentId: { _eq: parentId }, key: { _eq: path.at(0) } }
    : { parentId: { _is_null: true } };
  const id = await resolve(({ query }) => {
    const node = query.nodes({ where })?.[0];
    if (node) return node.id;
  });

  return toContextId(parentId ? path.slice(1) : path, id);
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
  const [id, setId] = useState<string | undefined>();
  const path = usePath();
  const { isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading) toId(path).then(setId);
  }, [JSON.stringify(path), isLoading]);
  return id;
};

const useContextId = () => {
  const [id, setId] = useState<Maybe<string | undefined>>();
  const path = usePath();
  const { isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading) toContextId(path).then(setId);
  }, [JSON.stringify(path), isLoading]);
  return id;
};

export { toId, fromId, useId, useContextId };
