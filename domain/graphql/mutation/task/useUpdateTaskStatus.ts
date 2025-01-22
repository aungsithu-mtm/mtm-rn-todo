import { ResponseMessage, UpdateTaskStatusForm } from "@/types";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_TASKS_STATUS_MUTATION = gql`
mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`
export type UpdateTasksStatusVariable = {
  input: UpdateTaskStatusForm
}

export type UpdateTasksResponse = {
  updateTasksStatus: ResponseMessage;
}

export const useUpdateTasksStatusMutation = () => {
  return useMutation<UpdateTasksResponse, UpdateTasksStatusVariable>(UPDATE_TASKS_STATUS_MUTATION);
}