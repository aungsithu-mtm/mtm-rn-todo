import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { ResponseMessage } from "@/types";

const ACCOUNT_DELETE_MUTATION = gql`
  mutation Delete {
    deleteUser {
      data
      isSuccess
      message
      type
    }
  }
`;

export type AccountResponse = {
  deleteUser: ResponseMessage;
};

export const useUserDeleteMutation = () => {
  return useMutation<AccountResponse>(ACCOUNT_DELETE_MUTATION);
};
