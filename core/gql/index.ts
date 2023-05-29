import { createReactClient } from '@gqty/react';
import type { QueryFetcher } from 'gqty';
import { Cache, createClient } from 'gqty';
import type { GeneratedSchema } from './schema.generated';
import { generatedSchema, scalarsEnumsHash } from './schema.generated';
import { nhost } from 'nhost';
import { createSubscriptionsClient } from '@gqty/subscriptions';

const getHeaders = (): Record<string, string> =>
  process.env.HASURA_GRAPHQL_ADMIN_SECRET
    ? {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      }
    : nhost.auth.isAuthenticated()
    ? {
        'Content-Type': 'application/json',
        authorization: `Bearer ${nhost.auth.getAccessToken()}`,
      }
    : {
        'Content-Type': 'application/json',
        'x-hasura-role': 'public',
      };

const queryFetcher: QueryFetcher = async (
  { query, variables, operationName },
  fetchOptions
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/graphql`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
      mode: 'cors',
      ...fetchOptions,
    }
  );

  const json = await response.json();

  return json;
};

const cache = new Cache(
  undefined,
  {
    maxAge: Infinity,
    staleWhileRevalidate: 5 * 60 * 1000,
    normalization: false,
  }
);

const subscriptionsClient = createSubscriptionsClient({

  wsEndpoint: () => {
    const url = new URL(`${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/graphql`);
    // eslint-disable-next-line functional/immutable-data
    url.protocol = url.protocol.replace('http', 'ws');
    return url.href;
  },
});

export const client = createClient<GeneratedSchema>({
  schema: generatedSchema,
  scalars: scalarsEnumsHash,
  cache,
  subscriptionsClient,
  fetchOptions: {
    fetcher: queryFetcher,
  },
});

// Core functions
export const { resolve, subscribe, schema } = client;

// Legacy functions
export const {
  query,
  mutation,
  mutate,
  subscription,
  resolved,
  refetch,
  track,
} = client;

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
  useSubscription,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Enable Suspense, you can override this option at hooks.
    suspense: true,
    mutationSuspense: true,
    transactionQuerySuspense: true,
    //staleWhileRevalidate: true,
  },
});

export * from './schema.generated';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('@gqty/logger').then(({ createLogger }) => {
    const logger = createLogger(client);
    logger.start();
  });
}