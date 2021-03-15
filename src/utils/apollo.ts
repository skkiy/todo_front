import { ApolloClient, gql, InMemoryCache } from "@apollo/client"

export const createApolloClient = () => {
  const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache: new InMemoryCache(),
  })

  client
    .query({
      query: gql`
        query GetRates {
          rates(currency: "USD") {
            currency
          }
        }
      `,
    })
    .then((res) => console.log(res))

  return client
}
