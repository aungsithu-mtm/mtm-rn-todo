import { useMutation, gql } from "@apollo/client";
import { UserProviderInput } from "../../input/UserInput";

const UPDATE_USER_PROVIDER = gql`
  mutation UpdateUserProvider($input: UpdateProviderInput!) {
    updateUserProvider(input: $input) {
      userId
      email
      token
    }
  }
`;

export type UserProviderVariables = {
  input: UserProviderInput;
};

export type ProviderResponse = {
  updateUserProvider: {
    userId: string;
    email: string;
    token: string;
  };
};

export const useUpdateProviderMutation = () => {
  return useMutation<ProviderResponse, UserProviderVariables>(
    UPDATE_USER_PROVIDER
  );
};
