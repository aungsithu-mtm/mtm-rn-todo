import {
    useTaskCreateMutation,
    useDeleteTasksMutation,
    useTaskUpdateMutation,
    useUpdateTasksStatusMutation
} from "@/domain/graphql/mutation/task";

import {
    useTaskQuery,
    useTasksQuery,
    useTasksByDateQuery
} from "@/domain/graphql/query/task";
import { AddTaskForm, EditTaskForm, Task, UpdateTaskStatusForm } from "@/types";
import { errorHandler } from "@/utils/errorHandler";
import ShowToast from "@/utils/toast";
import { ApolloError } from "@apollo/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const getTasks = () => {
    const [
        getTasks,
        {
            called: calledTask,
            loading: loadingTask,
            data: dataTask,
            error: errorTask,
            refetch: refetchTask,
        },
    ] = useTasksQuery(
        () => { },
        (e) => console.log(e.message)
    );
    return {
        getTasks,
        loadingProfile: loadingTask && calledTask,
        errorTask,
        profile: dataTask && dataTask.tasks,
        refetchTask,
    };
};


const getTasksByDate = (date: string) => {
    const [
        getTasks,
        {
            called: calledTask,
            loading: loadingTask,
            data: dataTask,
            error: errorTask,
            refetch: refetchTask
        },
    ] = useTasksByDateQuery(
        () => { },
        (error) => { console.error("Error occurred:", error); }
    );

    useEffect(() => {
        if (date) {
            getTasks({
                variables: { getTaskDate: date },
            });
        }
    }, [date, getTasks]);

    return {
        getTasks,
        loading: loadingTask && calledTask, // Fix loading logic
        errorTask,
        tasks: dataTask?.tasksByDate || [], // Use `dataTask?.tasksByDate` safely
        refetchTask,
    };
};

const getTask = (id: string) => {
    const [task, setTask] = useState<Task>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    try {
        const { data, error } = useTaskQuery({ getTaskId: id }, !id);

        useEffect(() => {
            if (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }

            if (data) {
                setTask(data.getTask);
                setIsSuccess(true);
            }
        }, [error, data]);
    } catch (error) {
        const err = error as ApolloError;
        ShowToast("Error", errorHandler(err), "error");
    }
    return { task, isSuccess };
};

const createTask = () => {
    const [task, setTask] = useState<AddTaskForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useTaskCreateMutation();

    useEffect(() => {
        (async () => {
            try {
                if (task) {
                    const result = await taskMutation({
                        variables: {
                            input: task!,
                        },
                    });
                    if (result.data?.createTask) {
                        setIsSuccess(true);
                        setTask(undefined);
                        ShowToast("Success", result.data.createTask.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [task]);
    return { isSuccess, setTask };
};

const updateTask = () => {
    const [task, setTask] = useState<EditTaskForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useTaskUpdateMutation();
    const navigate = useRouter();

    useEffect(() => {
        (async () => {
            try {
                if (task) {
                    const result = await taskMutation({
                        variables: {
                            updateTaskId: task._id || "",
                            input: {
                                _id: task._id || "",
                                title: task.title,
                                description: task.description,
                                isActive: task.isActive,
                                date: task.date,
                                fromTime: task.fromTime,
                                toTime: task.toTime,
                                status: task.status
                            },
                        },
                    });
                    if (result.data?.updateTask) {
                        setIsSuccess(true);
                        setTask(undefined);
                        navigate.replace({
                            pathname: "/(drawer)/(tabs)/(todo)/pages",
                            params: { id: task._id as string },
                        });
                        ShowToast("Success", result.data.updateTask.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [task]);

    return { isSuccess, setTask };
};

const updateTaskStatus = () => {
    const [task, setTask] = useState<UpdateTaskStatusForm | undefined>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useUpdateTasksStatusMutation();
    const navigate = useRouter();

    useEffect(() => {
        (async () => {
            try {
                if (task) {
                    const result = await taskMutation({
                        variables: {
                            input: task
                        },
                    });
                    if (result.data?.updateTasksStatus) {
                        setIsSuccess(true);
                        setTask(undefined);
                        ShowToast("Success", result.data.updateTasksStatus.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [task]);

    return { isSuccess, setTask };
};

const deleteTasks = () => {
    const [taskList, setTaskList] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useDeleteTasksMutation();

    useEffect(() => {
        (async () => {
            try {
                if (taskList.length != 0) {
                    const result = await taskMutation({
                        variables: {
                            input: taskList
                        },
                    });
                    if (result.data?.deleteTasks) {
                        setIsSuccess(true);
                        setTaskList([]);
                        ShowToast("Success", result.data.deleteTasks.message, "success");
                    }
                }
            } catch (error) {
                const err = error as ApolloError;
                ShowToast("Error", errorHandler(err), "error");
            }
        })();
    }, [taskList]);

    return { isSuccess, setTaskList };
};

export {
    getTasks,
    getTasksByDate,
    getTask,
    createTask,
    updateTask,
    deleteTasks,
    updateTaskStatus
};
