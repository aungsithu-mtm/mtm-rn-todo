import { Task } from "@/types";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const TASK_QUERY = gql`
query GetTask($getTaskId: ID) {
  getTask(id: $getTaskId) {
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
export type TaskVariables = {
  getTaskId: string
}

export type TaskResponse = {
  getTask: Task
}

export const useTaskQuery = (variables: TaskVariables, skip: boolean) => {
  return useQuery<TaskResponse, TaskVariables>(TASK_QUERY, {
    variables,
    fetchPolicy: "network-only",
    errorPolicy: "all",
    skip: skip,
  })
}
