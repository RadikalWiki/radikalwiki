import { fromId } from 'core/path';
import { query, resolved } from 'gql';
import { useRouter } from 'next/router';

const prefetch = async (
  path: string[],
  parentId?: string
): Promise<string | undefined> => {
  const where = {
    _and: parentId
      ? [{ namespace: { _eq: path.at(0) } }, { parentId: { _eq: parentId } }]
      : [{ parentId: { _is_null: true } }],
  };
  const id = await resolved(() => {
    const node = query.nodes({ where }).at(0);
    node?.__typename;
    const id = node?.id;
    node?.name;
    return id;
  });

  return path.length > 1
    ? await prefetch(parentId ? path.slice(1) : path, id)
    : id;
};

const useLink = () => {
  const router = useRouter();

  const path = async (path: string[], app?: string) => {
    await prefetch(path);
    const query = app ? `?app=${app}` : ""
    router.push(`/${path.join('/')}${query}`);
  };

  const id = async (id: string, app?: string) => {
    const path = await fromId(id);
    await prefetch(path);
    const query = app ? `?app=${app}` : ""
    router.push(`/${path.join('/')}${query}`);
  };

  const push = async (path: string[], app?: string) => {
    const pushPath = router.asPath.split('?')[0].slice(1).split("/").concat(path).map(decodeURI)
    await prefetch(pushPath);
    const query = app ? `?app=${app}` : ""
    router.push(`/${pushPath.join('/')}${query}`);
  };

  const pop = async () => {
    const pushPath = router.asPath.split('?')[0].slice(1).split("/").slice(0, -1).map(decodeURI)
    router.push(`/${pushPath.join('/')}`);
  };

  const back = router.back

  return { path, id, push, pop, back };
};

export default useLink;
