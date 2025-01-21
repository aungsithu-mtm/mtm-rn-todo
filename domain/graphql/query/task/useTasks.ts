import { Task } from "@/types";
import { ApolloError, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const TASKS_QUERY = gql`
query Tasks {
  tasks {
    _id
    title
    description
    date
    fromTime
    toTime
    isActive
    status
    userId
  }
}
`
type TaskResponse = {
  tasks: [Task]
}

export const useTasksQuery = (onCompleted?: (result: TaskResponse) => void, onError?: (error: ApolloError) => void) => {
  return useLazyQuery<TaskResponse>(TASKS_QUERY, {
    onCompleted,
    onError,
    errorPolicy: "all",
  })
}