import { useRouter } from 'next/router';
import { useContextPath, useLink, useSession } from 'hooks';
import { useAuthenticated, useUserEmail, useUserId } from '@nhost/nextjs';
import { useSubscription } from 'gql';

const useApps = () => {
  const router = useRouter();
  const link = useLink();
  const [session] = useSession();
  const isAuthenticated = useAuthenticated();
  const userId = useUserId();
  const email = useUserEmail();
  const ctxPath = useContextPath();
  const sub = useSubscription();

  const currentApp =
    (router.query.app as string) ??
    (router.pathname == '/' ? 'home' : 'folder');

  const handleClick =
    ({ path, app }: { path?: string[]; app?: string }) =>
    async () => {
      const scroll = document.querySelector('#scroll');
      localStorage.setItem(
        `scroll/${currentApp}`,
        scroll?.scrollTop?.toString() ?? '0'
      );
      if (currentApp == 'folder') {
        localStorage.setItem('path', router.asPath ?? '');
      }
      await link.path(path ?? ctxPath, app);
      scroll?.scrollTo(
        0,
        JSON.parse(localStorage[`scroll/${app ?? 'folder'}`] ?? 0)
      );
    };

  return [
    {
      name: 'Hjem',
      mimeId: 'app/home',
      active: ['home'].includes(currentApp),
      onClick: handleClick({ path: [] }),
      notifications: isAuthenticated
        ? sub
            .membersAggregate({
              where: {
                _and: [
                  { accepted: { _eq: false } },
                  {
                    _or: [
                      { nodeId: { _eq: userId } },
                      { email: { _eq: email } },
                    ],
                  },
                ],
              },
            })
            .aggregate?.count()
        : 0,
    },
    {
      name: 'Mappe',
      mimeId: 'app/folder',
      active: ['folder', 'editor'].includes(currentApp),
      onClick: handleClick({
        path: localStorage?.path?.slice(1)?.split('/'),
      }),
      notifications: 0,
    },
    ...(isAuthenticated
      ? [
          {
            name: 'Tal',
            mimeId: 'app/speak',
            active: ['speak'].includes(currentApp),
            onClick: handleClick({ app: 'speak' }),
            notifications: 0,
          },
          {
            name: 'Stem',
            mimeId: 'app/vote',
            active: ['vote', 'poll'].includes(currentApp),
            onClick: handleClick({ app: 'vote' }),
            notifications: 0,
          },
        ]
      : []),
  ];
};

export default useApps;
