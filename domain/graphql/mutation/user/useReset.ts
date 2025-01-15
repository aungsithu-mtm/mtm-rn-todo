import { useMutation, gql } from "@apollo/client";
import { UserInput } from "../../input/UserInput";

const RESET_MUTATION = gql`
  mutation Mutation($input: ResetInput!) {
    resetPassword(input: $input) {
        userId
        email
        token
    }
  }
`;

export type ResetVariables = {
  input: UserInput;
};

export type ResetResponse = {
  resetPassword: {
    userId: string;
    email: string;
    token: string;
  };
};

export const useResetMutation = () => {
  return useMutation<ResetResponse, ResetVariables>(RESET_MUTATION);
};
