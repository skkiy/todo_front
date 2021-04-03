import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Time: any
  Cursor: any
}

export type Node = {
  id: Scalars["ID"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  name: Scalars["String"]
  email: Scalars["String"]
  twitter?: Maybe<Scalars["String"]>
}

export type Task = Node & {
  __typename?: "Task"
  id: Scalars["ID"]
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  createdAt: Scalars["Time"]
  deadline: Scalars["Time"]
  isCompleted: Scalars["Boolean"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  startCursor: Scalars["Cursor"]
  endCursor: Scalars["Cursor"]
  hasPreviousPage: Scalars["Boolean"]
  hasNextPage: Scalars["Boolean"]
}

export type Connection = {
  pageInfo: PageInfo
  edges: Array<Maybe<Edge>>
  totalCount: Scalars["Int"]
}

export type Edge = {
  cursor: Scalars["String"]
  node?: Maybe<Node>
}

export type TaskEdge = Edge & {
  __typename?: "TaskEdge"
  cursor: Scalars["String"]
  node?: Maybe<Task>
}

export type TaskConnection = Connection & {
  __typename?: "TaskConnection"
  pageInfo: PageInfo
  edges: Array<Maybe<TaskEdge>>
  totalCount: Scalars["Int"]
}

export enum TaskOrderKey {
  CreatedAt = "CREATED_AT",
  Deadline = "DEADLINE",
}

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type FilterCondition = {
  filterWord?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["ID"]>
  createdAt?: Maybe<Scalars["Time"]>
  deadline?: Maybe<Scalars["Time"]>
  isCompleted?: Maybe<Scalars["Boolean"]>
}

export type PageCondition = {
  backward?: Maybe<BackwardPagination>
  forward?: Maybe<ForwardPagination>
  pageNumber: Scalars["Int"]
  limit?: Maybe<Scalars["Int"]>
}

export type BackwardPagination = {
  last: Scalars["Int"]
  before?: Maybe<Scalars["Cursor"]>
}

export type ForwardPagination = {
  first: Scalars["Int"]
  after?: Maybe<Scalars["Cursor"]>
}

export type EdgeOrder = {
  key: OrderKey
  direction: OrderDirection
}

export type OrderKey = {
  task?: Maybe<TaskOrderKey>
}

export type Query = {
  __typename?: "Query"
  tasks: TaskConnection
  task: Task
  user?: Maybe<User>
}

export type QueryTasksArgs = {
  filterCondition?: Maybe<FilterCondition>
  pageCondition?: Maybe<PageCondition>
  edgeOrder?: Maybe<EdgeOrder>
}

export type QueryTaskArgs = {
  id?: Maybe<Scalars["ID"]>
}

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>
  name: Scalars["String"]
  email: Scalars["String"]
  twitter?: Maybe<Scalars["String"]>
}

export type CreateTaskInput = {
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  deadline: Scalars["Time"]
}

export type UpdateTaskInput = {
  id: Scalars["ID"]
  title?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  deadline?: Maybe<Scalars["Time"]>
  isCompleted?: Maybe<Scalars["Boolean"]>
}

export type UpdateUserInput = {
  id: Scalars["ID"]
  name: Scalars["String"]
  email: Scalars["String"]
  twitter?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  createTask: Task
  updateTask?: Maybe<Task>
  updateUser?: Maybe<User>
}

export type MutationCreateTaskArgs = {
  input: CreateTaskInput
}

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type TasksQueryVariables = Exact<{
  filterCondition?: Maybe<FilterCondition>
  pageCondition?: Maybe<PageCondition>
  edgeOrder?: Maybe<EdgeOrder>
}>

export type TasksQuery = { __typename?: "Query" } & {
  tasks: { __typename?: "TaskConnection" } & {
    pageInfo: { __typename?: "PageInfo" } & Pick<PageInfo, "endCursor" | "hasNextPage">
    edges: Array<
      Maybe<
        { __typename?: "TaskEdge" } & {
          node?: Maybe<
            { __typename?: "Task" } & Pick<
              Task,
              "id" | "title" | "description" | "createdAt" | "deadline" | "isCompleted"
            >
          >
        }
      >
    >
  }
}

export const TasksDocument = gql`
  query Tasks(
    $filterCondition: FilterCondition
    $pageCondition: PageCondition
    $edgeOrder: EdgeOrder
  ) {
    tasks(filterCondition: $filterCondition, pageCondition: $pageCondition, edgeOrder: $edgeOrder) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          description
          createdAt
          deadline
          isCompleted
        }
      }
    }
  }
`

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      filterCondition: // value for 'filterCondition'
 *      pageCondition: // value for 'pageCondition'
 *      edgeOrder: // value for 'edgeOrder'
 *   },
 * });
 */
export function useTasksQuery(
  baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options)
}
export function useTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options)
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>
