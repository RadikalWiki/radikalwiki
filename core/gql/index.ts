import { createReactClient } from "@gqty/react";
import { createSubscriptionsClient } from "@gqty/subscriptions";
import type { QueryFetcher } from "gqty";
import { createClient } from "gqty";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { auth } from "nhost";
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { generatedSchema, scalarsEnumsHash } from "./schema.generated";

const getHeaders = (): Record<string, string> =>
  process.env.HASURA_GRAPHQL_ADMIN_SECRET
    ? {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      }
    : {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.getAccessToken()}`,
      };

const queryFetcher: QueryFetcher = async function (query, variables) {
  const token = auth.getAccessToken();
  const accessTokenDecrypted: any = jwtDecode(token as any);
  if (accessTokenDecrypted.exp * 1000 < Date.now()) {
    const refreshToken = Cookies.get("nhostRefreshToken") || undefined;
    await auth.refreshSession(refreshToken);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/graphql`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: "cors",
    }
  );

  return await response.json();
};

const subscriptionsClient =
  typeof window !== "undefined"
    ? createSubscriptionsClient({
        failedConnectionCallback: async () => {
          const refreshToken = Cookies.get("nhostRefreshToken") || undefined;
          await auth.refreshSession(refreshToken);
          subscriptionsClient?.setConnectionParams(
            {
              headers: getHeaders(),
            },
            true
          );
        },
        wsEndpoint: () => {
          const url = new URL(
            `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/graphql`,
            window.location.href
          );
          // eslint-disable-next-line functional/immutable-data
          url.protocol = url.protocol.replace("http", "ws");
          return url.href;
        },
        reconnect: true,
        lazy: true,
      })
    : undefined;

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

subscriptionsClient?.setConnectionParams(
  {
    headers: getHeaders(),
  },
  true
);

auth?.onTokenChanged(() => {
  subscriptionsClient?.setConnectionParams(
    {
      headers: getHeaders(),
    },
    true
  );
});

export * from "./schema.generated";

export const getProp = (node: any, property: string) => {
  return node?.properties({ where: { name: { _eq: property } } })[0].value;
};

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  import("@gqty/logger").then(({ createLogger }) => {
    const logger = createLogger(client, {
      // Custom options...
    });
    logger.start();
  });
}
