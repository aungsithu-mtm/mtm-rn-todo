import { ResponseMessage } from "@/types";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
// Multi User Delete
const DELETE_USERS_MUTATION = gql`
mutation DeleteMultiUsers($input: [String]) {
    deleteMultiUsers(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`
//Single User Delete
const DELETE_USER_MUTATION = gql`
mutation DeleteSingleUser($input: String) {
    deleteSingleUser(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`
//Multi User Delete Variable
type DeleteUsersVariable = {
  input: String[]
}
//Single User Delete Vaariable
type DeleteUserVariable = {
  input: String
}

type DeleteUsersResponse = {
  deleteUsers: ResponseMessage;
}

type DeleteSingleUserResponse = {
  deleteSingleUser: ResponseMessage;
}
//Multi User Delete Mutation
export const useDeleteUsersMutation = () => {
  return useMutation<DeleteUsersResponse, DeleteUsersVariable>(DELETE_USERS_MUTATION);
}
//Single User Delete Mutation
export const useDeleteUserMutation = () => {
  return useMutation<DeleteSingleUserResponse, DeleteUserVariable>(DELETE_USER_MUTATION);
}