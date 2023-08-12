import { useRouter } from 'next/router';
import { useLink, useSession } from 'hooks';
import { useAuthenticated, useUserEmail, useUserId } from '@nhost/nextjs';
import { useSubscription } from 'gql';

const useApps = () => {
  const router = useRouter();
  const link = useLink();
  const [session] = useSession();
  const isAuthenticated = useAuthenticated();
  const userId = useUserId();
  const email = useUserEmail();
  const sub = useSubscription();

  const currentApp =
    (router.query.app as string) ??
    (router.pathname == '/' ? 'home' : 'folder');

  const handleClick = (path?: string[], app?: string) => async () => {
    const scroll = document.querySelector('#scroll');
    localStorage.setItem(
      `scroll/${currentApp}`,
      scroll?.scrollTop?.toString() ?? '0'
    );
    if (currentApp == 'folder') {
      localStorage.setItem('path', router.asPath ?? '');
    }
    await link.path(path ?? [], app);
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
      onClick: handleClick([]),
      notifications: sub
        .membersAggregate({
          where: {
            _and: [
              { accepted: { _eq: false } },
              {
                _or: [{ nodeId: { _eq: userId } }, { email: { _eq: email } }],
              },
            ],
          },
        })
        .aggregate?.count(),
    },
    ...(currentApp !== 'home'
      ? [
          {
            name: 'Mappe',
            mimeId: 'app/folder',
            active: ['folder', 'editor'].includes(currentApp),
            onClick: handleClick(
              localStorage?.path?.slice(1)?.split('/') ?? session?.prefix?.path
            ),
            notifications: 0,
          },
        ]
      : []),
    ...(isAuthenticated && currentApp !== 'home'
      ? [
          {
            name: 'Tal',
            mimeId: 'app/speak',
            active: ['speak'].includes(currentApp),
            onClick: handleClick(session?.prefix?.path, 'speak'),
            notifications: 0,
          },
          {
            name: 'Stem',
            mimeId: 'app/vote',
            active: ['vote', 'poll'].includes(currentApp),
            onClick: handleClick(session?.prefix?.path, 'vote'),
            notifications: 0,
          },
        ]
      : []),
  ];
};

export default useApps;
