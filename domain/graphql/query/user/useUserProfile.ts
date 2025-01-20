import { User } from '@/types/User'
import { ApolloError, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

const USER_PROFILE_QUERY = gql`
 query UserProfile {
  userProfile {
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
export type UserProfileResponse = {
  userProfile: User
}

export const useProfileQuery = (onCompleted?: (result: UserProfileResponse) => void, onError?: (error: ApolloError) => void) => {
  return useLazyQuery<UserProfileResponse>(USER_PROFILE_QUERY, {
    onCompleted,
    onError,
    errorPolicy: "all",
  })
}