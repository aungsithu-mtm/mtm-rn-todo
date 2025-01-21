import gql from "graphql-tag";
import { UpdateTaskInput } from "../../input/TaskInput"
import { ResponseMessage } from "@/types";
import { useMutation } from "@apollo/client";

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($updateTaskId: String, $input: UpdateTaskInput!) {
    updateTask(id: $updateTaskId, input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`;

export type UpdateTaskVariables = {
  input: UpdateTaskInput;
  updateTaskId: String;
};

export type UpdateTaskResponse = {
  updateTask: ResponseMessage;
};

export const useTaskUpdateMutation = () => {
  return useMutation<UpdateTaskResponse, UpdateTaskVariables>(
    UPDATE_TASK_MUTATION
  );
};
