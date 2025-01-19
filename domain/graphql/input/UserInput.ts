export type UserInput = {
  username?: string;
  email?: string;
  password?: string;
}

export type UserProviderInput = {
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | undefined;
  provider: string | undefined;
}

export type UserChangePasswordInput = {
  currentPassword: string,
  newPassword: string
}


export type UserUpdateInput = {
  _id: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
  isActive: boolean,
  imageUrl: string,
  publicId: string
}

