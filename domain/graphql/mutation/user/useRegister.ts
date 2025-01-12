import { useMutation, gql } from "@apollo/client";
import { UserInput } from "../../input/UserInput";

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      email
      token
      userId
    }
  }
`;

export type RegisterVariables = {
  input: UserInput;
};

export type RegisterResponse = {
  register: {
    userId: string;
    email: string;
    token: string;
  };
};

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, RegisterVariables>(REGISTER_MUTATION);
};
