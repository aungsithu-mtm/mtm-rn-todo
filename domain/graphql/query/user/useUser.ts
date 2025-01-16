import { User } from "@/types";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const USER_QUERY = gql`
query GetNote($getNoteId: ID) {
  getNote(id: $getNoteId) {
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
export type UserVariables = {
    getUserId: string
}

export type UserResponse = {
    getUser: User
}

export const useUserQuery = (variables: UserVariables, skip: boolean) => {
    return useQuery<UserResponse, UserVariables>(USER_QUERY, {
        variables,
        fetchPolicy: "network-only",
        errorPolicy: "all",
        skip: skip,
    })
}
