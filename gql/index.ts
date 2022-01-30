/**
 * GQTY: You can safely modify this file and Query Fetcher based on your needs
 */

import { createReactClient } from "@gqty/react";
import { createSubscriptionsClient } from "@gqty/subscriptions";
import type { QueryFetcher } from "gqty";
import { createClient } from "gqty";
import { auth } from "src/nhost";
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { generatedSchema, scalarsEnumsHash } from "./schema.generated";

const queryFetcher: QueryFetcher = async function (query, variables) {
  // Modify "/api/graphql" if needed
  const headers: Record<string, string> = process.env
    .HASURA_GRAPHQL_ADMIN_SECRET
    ? {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      }
    : {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.getJWTToken()}`,
      };
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_HTTP as string, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  const json = await response.json();

  return json;
};

const subscriptionsClient =
  typeof window !== "undefined"
    ? createSubscriptionsClient({
        wsEndpoint: () => {
          // Modify if needed
          const url = new URL(
            process.env.NEXT_PUBLIC_GRAPHQL_HTTP as string,
            window.location.href
          );
          url.protocol = url.protocol.replace("http", "ws");
          return url.href;
        },
        lazy: true,
        reconnect: true,
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
});

const { query, mutation, mutate, subscription, resolved, refetch, track } =
  client;

export { query, mutation, resolved };

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
    suspense: true,
    mutationSuspense: true,
    transactionQuerySuspense: true,
    staleWhileRevalidate: true,
  },
});

subscriptionsClient?.setConnectionParams(
  {
    headers: process.env.HASURA_GRAPHQL_ADMIN_SECRET
      ? {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        }
      : {
          authorization: `Bearer ${auth.getJWTToken()}`,
        },
  },
  true
);

auth.onTokenChanged(() => {
  subscriptionsClient?.setConnectionParams(
    {
      headers: process.env.HASURA_GRAPHQL_ADMIN_SECRET
        ? {
            "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          }
        : {
            authorization: `Bearer ${auth.getJWTToken()}`,
          },
    },
    true
  );
});

export * from "./schema.generated";
