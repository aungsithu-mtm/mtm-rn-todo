import { User } from "@/types";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const USER_QUERY = gql`
query User($_id: ID) {
  user(_id: $_id) {
      _id
    address
    email
    firstName
    isActive
    lastName
    imageUrl
    publicId
    phone
    username
  }
}
`
export type UserVariables = {
    _id: string
}

export type UserResponse = {
    user: User
}

export const useUserQuery = (variables: UserVariables, skip: boolean) => {
    console.log("User Variable", variables)
    return useQuery<UserResponse, UserVariables>(USER_QUERY, {
        variables,
        fetchPolicy: "network-only",
        errorPolicy: "all",
        skip: skip,
    })
}
