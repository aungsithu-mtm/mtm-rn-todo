import gql from "graphql-tag";
import { UserChangePasswordInput } from "../../input/UserInput";
import { useMutation } from "@apollo/client";

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangeUserPassword($input: UserChangePasswordInput!) {
    changeUserPassword(input: $input) {
      email
      token
      userId
    }
  }
`;

export type ChangePasswordVariables = {
  input: UserChangePasswordInput;
};

export type ChangePasswordResponse = {
  changeUserPassword: {
    userId: string;
    email: string;
    token: string;
  };
};

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, ChangePasswordVariables>(
    CHANGE_PASSWORD_MUTATION
  );
};
