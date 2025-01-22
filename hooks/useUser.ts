
import { UserUpdateInput } from "@/domain/graphql/input/UserInput";
import { useUserCreateMutation } from "@/domain/graphql/mutation/user";
import { useProfileUpdateMutation } from "@/domain/graphql/mutation/user";
import { useDeleteUsersMutation, useDeleteUserMutation } from "@/domain/graphql/mutation/user/useDeleteUser";
import { useUserQuery, useUsersQuery } from "@/domain/graphql/query/user"
import { User, AddUserForm, EditUserForm } from "@/types";
import { errorHandler } from "@/utils/errorHandler";
import ShowToast from "@/utils/toast";
import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";


const getUsers = () => {
    const [
        getUsers,
        {
            called: calledUser,
            loading: loadingUser,
            data: dataUser,
            error: errorUser,
            refetch: refetchUser,
        },
    ] = useUsersQuery(
        () => { },
        (e) => console.log(e.message)
    );
    return {
        getUsers,
        loadingProfile: loadingUser && calledUser,
        errorUser,
        profile: dataUser && dataUser.users,
        refetchUser,
    };
};

const getUser = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, error, refetch } = useUserQuery({ _id: id }, !id);

    useEffect(() => {
        if (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
        if (data) {
            setUser(data.user);
            setIsSuccess(true);
        }
    }, [data, error]);

    return { user, isSuccess, refetch };
};

const createUser = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [userMutation] = useUserCreateMutation();

    const handleCreateUser = async (user: AddUserForm) => {
        try {
            const result = await userMutation({
                variables: { input: user },
            })
            if (result.data?.createUser) {
                setIsSuccess(true);
                ShowToast("Success", result.data.createUser.message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    }
    return {
        isSuccess, handleCreateUser
    };
};


const deleteUsers = () => {
    const [userList, setUserList] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [deleteMutiUserMutation] = useDeleteUsersMutation();

    useEffect(() => {
        (async () => {
            try {
                if (userList.length != 0) {
                    const result = await deleteMutiUserMutation({
                        variables: {
                            input: userList
                        },
                    });
                    if (result.data?.deleteUsers) {
                        setIsSuccess(true);
                        setUserList([]);
                        ShowToast("Success", result.data.deleteUsers.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [userList]);

    return { isSuccess, setUserList };
};

const deleteUser = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [deleteUserMutation] = useDeleteUserMutation();
    const handleDeleteUser = async (id: string) => {
        try {
            const result = await deleteUserMutation({
                variables: {
                    input: id
                },
            });
            if (result.data?.deleteSingleUser) {
                setIsSuccess(true);
                ShowToast("Success", result.data.deleteSingleUser.message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    }

    return { isSuccess, handleDeleteUser };
};


const updateUser = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [userMutation] = useProfileUpdateMutation();

    const handleUpdateUser = async (user: EditUserForm) => {
        try {
            if (user) {
                const result = await userMutation({
                    variables: {
                        input: user!,
                    },
                });
                if (result.data?.updateUserProfile) {
                    setIsSuccess(true);
                    ShowToast("Success", result.data.updateUserProfile.message, "success");
                }
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    }
    return {
        isSuccess, handleUpdateUser
    };
};

export {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
};
