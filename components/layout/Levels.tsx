import React from 'react';
import {} from 'comps';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { useQuery } from 'gql';

const Level1 = () => {
  const { isLoading } = useAuthenticationStatus();

  if (isLoading) return null;

  return <Level2 />;
};

const Level2 = () => {
  const query = useQuery({ __experimentalGreedyFetch: true });
  const node = query.node({ id: 'a933876e-ce89-4ed1-9a47-269e009617ea' });

  return node?.id ? (
    <>
      <Level3 />
      {node?.data?.({ path: 'type' })}
    </>
  ) : null;
};

const Level3 = () => {
  const query = useQuery({ __experimentalGreedyFetch: true });
  const node = query.node({ id: '8400555d-f2f5-4db2-bf66-fd1ea239d931' });

  return node?.id ? (
    <>
      <Level4 />
      {node?.data?.({ path: 'type' })}
    </>
  ) : null;
};

const Level4 = () => {
  const query = useQuery({ __experimentalGreedyFetch: true });
  const node = query.node({ id: 'a734862a-d73d-44c0-8b21-bb1ce774f9e1' });

  return <>{node?.id && node?.data?.({ path: 'type' })}</>;
};

export default Level1;
