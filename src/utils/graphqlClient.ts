import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

// Paste you token in the below variable as a string
const token = ``

export const gqlClient = new ApolloClient({
  cache: cache,
  uri: "https://api.github.com/graphql",
  headers: { authorization: `Bearer ${token}` },
});
