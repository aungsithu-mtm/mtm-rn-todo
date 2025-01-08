export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    address: string,
    phone: string,
    isActive: boolean
    imageUrl: string
}

export type UserChangePassword = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

export type ResponseMessage = {
    isSuccess: boolean,
    message: string,
    type: string,
    data: JSON
};