import { Task } from "@/types";
import { ApolloError, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

const TASKS_QUERY = gql`
    query TasksByDate($getTaskDate: String) {
      tasksByDate(date: $getTaskDate) {
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
  `;

type TaskVariables = {
  getTaskDate: string;
};

type TaskResponse = {
  tasksByDate: [Task];
};

export const useTasksByDateQuery = (
  onCompleted?: (result: TaskResponse) => void,
  onError?: (error: ApolloError) => void
) => {
  return useLazyQuery<TaskResponse, TaskVariables>(TASKS_QUERY, {
    onCompleted,
    onError,
    errorPolicy: "all",
  });
};
