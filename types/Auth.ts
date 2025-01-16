export interface AuthType {
    username?: string,
    email: string,
    password: string
}

export type ForgetFormValues = {
    email?: string;
    code?: string;
    password?: string;
};

export type CODE = {
    code: string
}