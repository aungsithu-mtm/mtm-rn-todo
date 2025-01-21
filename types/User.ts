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

export type AddUserForm = {
    username: string
    email: string
    password: string
    imageUrl: string
    publicId: string
}

export type Code = {
    code: string
}

export type EditUserForm = {
    _id: string
    firstName?: string
    lastName?: string
    username: string
    email: string
    address?: string
    phone?: string
    imageUrl?: string | null
    publicId?: string
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

