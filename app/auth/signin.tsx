import React, { useState } from "react";
import AuthForm from "./authForms"
import { ModalType } from "@/enums/common";
import { AuthType } from "@/types";

const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const signInHandler = async (values: Omit<AuthType, 'username'>) => {
        setIsLoading(false);
    }

    return (
        <AuthForm mode={ModalType.Signin} handleForm={data => signInHandler(data)} loading={isLoading} />
    );
};

export default SignInPage;