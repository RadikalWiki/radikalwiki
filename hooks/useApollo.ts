import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { useSession, useEnv } from "hooks";
import * as ws from "ws";

export type Session = {
    id: string,
    user: string,
    role: string,
    token: string,
}

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  const { session } = useSession();
  return useApolloSession(session);
}

export function useApolloSession(
  session?: Session
): ApolloClient<NormalizedCacheObject> {
  const env = useEnv();
  const local = typeof window === "undefined";
  if (local && globalApolloClient) {
    return globalApolloClient;
  }

  let headers;
  let wsUri;
  let httpUri;
  let webSocketImpl;
  if (local) {
    headers = {
      "x-hasura-admin-secret": env.HASURA_GRAPHQL_ADMIN_SECRET,
    };
    httpUri = env.GRAPHQL_HTTP_LOCAL;
    wsUri = env.GRAPHQL_WS_LOCAL;
    webSocketImpl = ws;

    if (!wsUri) throw new Error("Env var `GRAPHQL_WS_LOCAL` not defined");
  } else {
    headers = {
      "user-id": session?.id,
      "user-role": session?.role,
      "user-token": session?.token,
    };
    httpUri = process.env.NEXT_PUBLIC_GRAPHQL_HTTP;
    wsUri = process.env.NEXT_PUBLIC_GRAPHQL_WS;
    if (!wsUri) throw new Error("Env var `GRAPHQL_WS_PUBLIC` not defined");
  }

  const httpLink = new HttpLink({
    uri: httpUri,
    headers,
  });

  const wssLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
    webSocketImpl,
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wssLink,
    httpLink
  );

  globalApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return globalApolloClient;
}

export const query = async (query: any, variables?: any) => {
  const client = useApolloSession();
  return await client.query({ query, variables });
};

export const mutation = async (mutation: any, variables?: any) => {
  const client = useApolloSession();
  return await client.mutate({ mutation, variables });
};
