import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { useEnv } from "hooks";
import * as ws from "ws";
import { auth } from "utils/nhost";

export type Session = {
  id: string;
  user: string;
  role: string;
  token: string;
};

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let globalWsLink: WebSocketLink | null = null;

export const generateApolloClient = ({
  headers,
  auth,
}: {
  headers?: any;
  auth?: any;
}): { client: ApolloClient<NormalizedCacheObject>; wsLink: WebSocketLink } => {
  const env = useEnv();
  const local = typeof window === "undefined";
  if (local && globalApolloClient && globalWsLink) {
    return { client: globalApolloClient, wsLink: globalWsLink };
  }

  let wsUri;
  let httpUri;
  let webSocketImpl;
  if (local) {
    if (!headers) {
      headers = {
        "x-hasura-admin-secret": env.HASURA_GRAPHQL_ADMIN_SECRET,
      };
    }
    httpUri = env.GRAPHQL_HTTP_LOCAL;
    wsUri = env.GRAPHQL_WS_LOCAL;
    webSocketImpl = ws;
    if (!wsUri) throw new Error("Env var `GRAPHQL_WS_LOCAL` not defined");
  } else {
    if (!headers) {
      let isAuth = auth.isAuthenticated();
      if (isAuth) {
        headers = {
          authorization: `Bearer ${auth.getJWTToken()}`,
        };
      } else {
        headers = {
          role: "public",
        };
      }
    }
    httpUri = process.env.NEXT_PUBLIC_GRAPHQL_HTTP;
    wsUri = process.env.NEXT_PUBLIC_GRAPHQL_WS;
    if (!wsUri) throw new Error("Env var `GRAPHQL_WS_PUBLIC` not defined");
  }

  const httpLink = new HttpLink({
    uri: httpUri,
    headers,
  });

  const wsLink = new WebSocketLink({
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
    wsLink,
    httpLink
  );

  globalApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return { client: globalApolloClient, wsLink };
};

export const query = async (query: any, variables?: any) => {
  const { client } = await generateApolloClient({ auth });
  return await client.query({ query, variables });
};

export const mutation = async (mutation: any, variables?: any) => {
  const { client } = await generateApolloClient({ auth });
  return await client.mutate({ mutation, variables });
};
