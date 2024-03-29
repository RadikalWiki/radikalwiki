import { createReactClient } from '@gqty/react';
import { createSubscriptionsClient } from '@gqty/subscriptions';
import type { QueryFetcher } from 'gqty';
import { createClient } from 'gqty';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';
import { nhost } from 'nhost';
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';
import { generatedSchema, scalarsEnumsHash } from './schema.generated';

const url = `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN}.hasura.${process.env.NEXT_PUBLIC_NHOST_REGION}.nhost.run/v1/graphql`;

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

const queryFetcher: QueryFetcher = async (query, variables) => {
  //const token = nhost.auth.getAccessToken();
  //if (token) {
  //  const accessTokenDecrypted = jwtDecode<JwtPayload>(token);
  //  if ((accessTokenDecrypted.exp ?? 0) * 1000 < Date.now()) {
  //    const refreshToken = Cookies.get("nhostRefreshToken") || undefined;
  //    await nhost.auth.refreshSession(refreshToken);
  //  }
  //}
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
    }
  );

  return await response.json();
};

const subscriptionsClient = createSubscriptionsClient({
  //failedConnectionCallback: async () => {
  //  const refreshToken = Cookies.get("nhostRefreshToken") || undefined;
  //  await nhost.auth.refreshSession(refreshToken);
  //  console.log("failed callback");
  //  subscriptionsClient?.setConnectionParams({
  //    headers: getHeaders(),
  //  });
  //},
  wsEndpoint: () => {
    const urlClass = new URL(url);
    // eslint-disable-next-line functional/immutable-data
    urlClass.protocol = urlClass.protocol.replace('http', 'ws');
    return urlClass.href;
  },
  reconnect: true,
  lazy: false,
});

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
  subscriptionsClient,
  normalization: false,
});

const { query, mutation, mutate, subscription, resolved, refetch, track } =
  client;

export { query, mutation, mutate, subscription, resolved, refetch, track };

const {
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
    suspense: true,
    mutationSuspense: true,
    transactionQuerySuspense: true,
    staleWhileRevalidate: true,
  },
});

export {
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
};

nhost.auth.onTokenChanged(() => {
  console.log('token changed');
  subscriptionsClient.setConnectionParams(
    {
      headers: getHeaders(),
    },
    true
  );
});

export * from './schema.generated';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('@gqty/logger').then(({ createLogger }) => {
    const logger = createLogger(client);
    logger.start();
  });
}
