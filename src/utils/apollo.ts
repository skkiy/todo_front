import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import merge from "deepmerge"
import isEqual from "lodash/isEqual"
import { useMemo } from "react"

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE_"

let apolloClient: ApolloClient<NormalizedCacheObject>

export const createApolloClient = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const httpLink = new HttpLink({ uri: `${process.env.NEXT_PUBLIC_API_URL}/query` })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  })
  return client
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    _apolloClient.cache.restore(data)
  }

  if (typeof window === "undefined") return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
