import { useRouter } from 'next/router';
import { useLink, useSession } from 'hooks';
import { useAuthenticated } from '@nhost/nextjs';

const useApps = () => {
  const router = useRouter();
  const link = useLink();
  const [session] = useSession();
  const isAuthenticated = useAuthenticated();

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
    },
    {
      name: 'Mappe',
      mimeId: 'app/folder',
      active: ['folder', 'editor'].includes(currentApp),
      onClick: handleClick(
        localStorage?.path?.slice(1)?.split('/') ?? session?.prefix?.path
      ),
    },
    ...(isAuthenticated
      ? [
          {
            name: 'Tal',
            mimeId: 'app/speak',
            active: ['speak'].includes(currentApp),
            onClick: handleClick(session?.prefix?.path, 'speak'),
          },
          {
            name: 'Stem',
            mimeId: 'app/vote',
            active: ['vote', 'poll'].includes(currentApp),
            onClick: handleClick(session?.prefix?.path, 'vote'),
          },
        ]
      : []),
  ];
};

export default useApps;
