const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: "http://localhost:8080/v1/graphql",
    headers: {"x-hasura-admin-secret": "123456"},
  },
  destination: "./gql/index.ts",
  javascriptOutput: false,
  subscriptions: true
};

module.exports = config;