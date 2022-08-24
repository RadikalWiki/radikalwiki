import { query, resolved } from "gql";

const toId = async (path: string[], parentId?: string): Promise<string> => {
  const where = {
    _and: [
      { namespace: { _eq: path.at(-1) } },
      parentId
        ? { parentId: { _eq: parentId } }
        : { parentId: { _is_null: true } },
    ],
  };
  const id = await resolved(() => query.nodes({ where }).at(0)?.id);

  return path.length > 0 ? toId(path.slice(1), id) : id;
};

const fromId = async (id?: string): Promise<string[]> => {
  if (!id) return [];
  return await resolved(async () => {
    const node = query.node({ id });
    const parentId = node?.parentId;
    const namespace = node?.namespace;
    if (!parentId) return [];
    return (await fromId(parentId)).concat(namespace ? [namespace] : []);
  });
};

export { toId, fromId };
