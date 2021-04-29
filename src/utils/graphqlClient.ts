import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const gqlClient = new ApolloClient({
  cache: cache,
  uri: "https://api.github.com/graphql",
  // this token is only allowed to read data from github graphql api
  headers: { authorization: "Bearer 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" },
});
