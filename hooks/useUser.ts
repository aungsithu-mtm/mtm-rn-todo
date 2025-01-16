
import { useUserCreateMutation } from "@/domain/graphql/mutation/user";
import { useDeleteUsersMutation } from "@/domain/graphql/mutation/user/useDeleteUser";
import { useUserQuery, useUsersQuery } from "@/domain/graphql/query/user"
import { User, AddUserForm } from "@/types";
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
    const [user, setUser] = useState<User>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    try {
        const { data, error } = useUserQuery({ getUserId: id }, !id);

        useEffect(() => {
            if (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }

            if (data) {
                setUser(data.getUser);
                setIsSuccess(true);
            }
        }, [error, data]);
    } catch (error) {
        const err = error as ApolloError;
        ShowToast("Error", errorHandler(err), "error");
    }
    return { user, isSuccess };
};


const createUser = () => {
    const [user, setUser] = useState<AddUserForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [userMutation] = useUserCreateMutation();

    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    const result = await userMutation({
                        variables: {
                            input: user!,
                        },
                    });
                    if (result.data?.createUser) {
                        setIsSuccess(true);
                        setUser(undefined);
                        ShowToast("Success", result.data.createUser.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [user]);
    return {
        isSuccess, setUser
    };
};


const deleteUser = () => {
    const [userList, setUserList] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [deleteUserMutation] = useDeleteUsersMutation();

    useEffect(() => {
        (async () => {
            try {
                if (userList.length != 0) {
                    const result = await deleteUserMutation({
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




export { getUser, getUsers, createUser, deleteUser };
