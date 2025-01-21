import gql from "graphql-tag";
import { TaskInput } from "../../input/TaskInput"
import { ResponseMessage } from "@/types";
import { useMutation } from "@apollo/client";

const TASK_CREATE_MUTATION = gql`
  mutation CreateTask($input: TaskCreateInput!) {
    createTask(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`;

export type TaskCreateVariables = {
  input: TaskInput;
};

export type TaskResponse = {
  createTask: ResponseMessage;
};

export const useTaskCreateMutation = () => {
  return useMutation<TaskResponse, TaskCreateVariables>(TASK_CREATE_MUTATION);
};
