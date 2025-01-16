import { ResponseMessage } from "@/types";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
mutation deleteUsers($input: [String]) {
    deleteUsers(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`

export type DeleteUsersVariable = {
    input: String[]
}

export type DeleteUsersResponse = {
    deleteUsers: ResponseMessage;
}

export const useDeleteUsersMutation = () => {
    return useMutation<DeleteUsersResponse, DeleteUsersVariable>(DELETE_USER_MUTATION);
}