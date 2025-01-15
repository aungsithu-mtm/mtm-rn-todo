export type User = {
    _id: string
    firstName: string
    lastName: string
    username: string
    email: string
    address: string
    phone: string
    isActive: boolean
    publicId: string
    imageUrl: string | null
}

export type UserForm = {
    firstName?: string
    lastName?: string
    username: string
    email: string
    address?: string
    phone: string
}

export type AddUserForm = {
    username: string
    email: string
    password: string
}

export type EditUserForm = {
    firstName?: string
    lastName?: string
    username: string
    email: string
    address?: string
    phone?: string
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