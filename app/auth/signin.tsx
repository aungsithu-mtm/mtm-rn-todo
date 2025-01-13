import React, { useState } from "react";
import AuthForm from "./authForms"
import { ModalType } from "@/enums/common";
import { AuthType } from "@/types";
import { useAuthContext } from "@/context/AuthContext";

const SignInPage = () => {
    const { onLogin } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)

    const signInHandler = async (values: Omit<AuthType, 'username'>) => {
        setIsLoading(true);
        await onLogin!(values).finally(() => setIsLoading(false))
    }
    return (
        <AuthForm mode={ModalType.Signin} handleForm={data => signInHandler(data)} loading={isLoading} />
    );
};

export default SignInPage;