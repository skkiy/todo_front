import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import {
  OrderDirection,
  TaskOrderKey,
  TasksDocument,
  TasksQuery,
  useTasksQuery,
} from "../generated/graphql"
import styles from "../styles/Home.module.css"
import { addApolloState, initializeApollo } from "../utils/apollo"

const Home: NextPage<{ data?: TasksQuery | undefined }> = ({ data }) => {
  console.log(data)
  return <div className={styles.container}></div>
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: TasksDocument,
    variables: {
      pageCondition: {
        pageNumber: 1,
        limit: 2,
      },
      filterCondition: {},
      edgeOrder: {
        key: {
          task: TaskOrderKey.CreatedAt,
        },
        direction: OrderDirection.Desc,
      },
    },
  })

  return addApolloState(apolloClient, {
    props: {
      data,
    },
  })
}
