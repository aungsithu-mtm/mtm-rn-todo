import { User } from "@/types";
import { ApolloError, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

export const USERS_QUERY = gql`
query Users {
  users {
    _id
    address
    email
    firstName
    isActive
    lastName
    imageUrl
    phone
    username
  }
}
`
export type UserResponse = {
  users: [User]
}

export const useUsersQuery = (onCompleted?: (result: UserResponse) => void, onError?: (error: ApolloError) => void) => {
  return useLazyQuery<UserResponse>(USERS_QUERY, {
    onCompleted,
    onError,
    errorPolicy: "all",
  })
}