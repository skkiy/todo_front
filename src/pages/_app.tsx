import "../styles/globals.css"
import { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "../utils/apollo"

function MyApp({ Component, pageProps }: AppProps) {
  const client = createApolloClient()

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
