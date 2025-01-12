import { ApolloError } from "@apollo/client";
import { ClerkAPIErrorJSON, ClerkRuntimeError } from "@clerk/types";
import { GraphQLError, GraphQLFormattedError } from "graphql";

type errorTypes = ApolloError | GraphQLError | GraphQLFormattedError | ClerkAPIErrorJSON | ClerkRuntimeError;

export const errorHandler = (error: errorTypes) => {
    if(error.message.includes(APIError.EmailAlreadyExists)) {
        return "Email already exists";
    } else if (error.message.includes(APIError.InvalidCredential)) {
        return "Email or password is incorrect."
    } else if (error.message.includes(APIError.UserExist)) {
        return "An account already exists with this email address."
    } else if (error.message.includes(APIError.UserNotFound)) {
        return "We couldn’t locate your account. Please double-check the information or try another email."
    } else {
        return error.message
    }
};

export const APIError = {
	EmailAlreadyExists: "EmailAlreadyExists",
	PhoneAlreadyExists: "PhoneAlreadyExists",
    VerificationFailed: "verification_failed",
    InvalidCredential: "InvalidCredentials",
    UserExist: "UserExists",
    UserNotFound: "UserNotFound"
}
