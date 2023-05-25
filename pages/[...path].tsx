import React, { Suspense, startTransition, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PathLoader } from 'comps';
import { fromId } from 'core/path';
import { usePath } from 'hooks';
import { useAuthenticationStatus } from '@nhost/nextjs';

const Path = () => {
  const router = useRouter();
  const fullpath = usePath();
  const { isLoading } = useAuthenticationStatus();

  // Redirect uuid v4 to full path
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      fullpath.length == 1 &&
      fullpath[0].match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    )
      fromId(fullpath[0]).then((path) => {
        if (path.length == 0) return;
        startTransition(() => {
          router.push(`${path.join('/')}`);
        });
      });
  }, [fullpath]);

  if (isLoading || fullpath.length === 0) return null;
  return (
    <Suspense fallback={null}>
      <PathLoader keys={[]} fullpath={fullpath} />
    </Suspense>
  );
};

export default Path;
