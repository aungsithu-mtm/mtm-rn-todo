import gql from "graphql-tag";
import { UserUpdateInput } from "@/domain/graphql/input/UserInput";
import { ResponseMessage } from "@/types/user";
import { useMutation } from "@apollo/client";

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($input: UserUpdateProfileInput!) {
    updateUserProfile(input: $input) {
      data
      isSuccess
      message
      type
    }
  }
`;

export type UpdateProfileVariables = {
  input: UserUpdateInput;
};

export type UpdateProfileResponse = {
  updateUserProfile: ResponseMessage;
};

export const useProfileUpdateMutation = () => {
  return useMutation<UpdateProfileResponse, UpdateProfileVariables>(
    UPDATE_PROFILE_MUTATION
  );
};
