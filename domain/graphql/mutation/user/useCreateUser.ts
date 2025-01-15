import { useMutation, gql } from "@apollo/client";
import { UserInput } from "../../input/UserInput";
import { ResponseMessage } from "@/types";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`;

export type UserVariable = {
  input: UserInput;
};

export type CreateResponse = {
  createUser: ResponseMessage;
};

export const useUserCreateMutation = () => {
  return useMutation<CreateResponse, UserVariable>(CREATE_USER_MUTATION);
};
