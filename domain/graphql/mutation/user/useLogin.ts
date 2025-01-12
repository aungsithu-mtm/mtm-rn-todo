import { useMutation, gql } from "@apollo/client";
import { UserInput } from "../../input/UserInput";
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      userId
      email
      token
    }
  }
`;

export type LoginVariables = {
  input: UserInput;
};

export type LoginResponse = {
  login: {
    userId: string;
    email: string;
    token: string;
  };
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION);
};
