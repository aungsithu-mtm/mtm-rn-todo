import React, { useState } from "react";
import AuthForm from "./authForms"
import { ModalType } from "@/enums/common";
import { AuthType } from "@/types";

const SignUpPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const signInHandler = async (values: Omit<AuthType, 'username'>) => {
        setIsLoading(false);
    }

    return (
        <AuthForm mode={ModalType.SignUp} handleForm={data => signInHandler(data)} loading={isLoading} />
    );
};

export default SignUpPage;