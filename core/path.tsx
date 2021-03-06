import { query, resolved } from "gql";

const toWhere = (path: string[], root = true): any => {
  const like = path.slice(-1)[0];
  const where =
    path.length > 0
      ? {
          parent: toWhere(path.slice(0, path.length - 1), false),
          namespace: { _like: like },
        }
      : { parentId: { _is_null: true } };
  return root ? { where } : where;
};

const fromId = async (id?: string): Promise<string[]> => {
  return await resolved(async () => {
    const node = query.node({ id });
    const { parentId, namespace } = node!;
    if (!parentId) return [];
    return (await fromId(parentId)).concat(namespace ? [namespace] : []);
  });
};

export { toWhere, fromId };
