import { ResponseMessage } from "@/types";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_TASKS_MUTATION = gql`
mutation DeleteTasks($input: [String]) {
    deleteTasks(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`
export type DeleteTasksVariable = {
  input: String[]
}

export type DeleteTasksResponse = {
  deleteTasks: ResponseMessage;
}

export const useDeleteTasksMutation = () => {
  return useMutation<DeleteTasksResponse, DeleteTasksVariable>(DELETE_TASKS_MUTATION);
}