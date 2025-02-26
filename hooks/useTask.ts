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
import { useEffect, useState } from "react";

const getTasks = () => {
    const [
        getTasks,
        {
            called: calledTask,
            loading: loadingTask,
            data: dataTask,
            error: errorTask,
            refetch: refetchTasks,
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
        refetchTasks,
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
        loading: loadingTask && calledTask,
        errorTask,
        tasks: dataTask?.tasksByDate || [],
        refetchTask,
    };
};

const getTask = (id: string) => {
    const [task, setTask] = useState<Task>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { data, error, refetch } = useTaskQuery({ getTaskId: id }, !id);

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

    return { task, isSuccess, refetch };
};

const createTask = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useTaskCreateMutation();

    const handleCreateTask = async (task: AddTaskForm) => {
        try {
            const result = await taskMutation({
                variables: { input: task },
            });

            if (result.data?.createTask) {
                setIsSuccess(true);
                ShowToast("Success", result.data.createTask.message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    };
    return { isSuccess, handleCreateTask };
};

const updateTask = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useTaskUpdateMutation();

    const handleUpdateTask = async (task: EditTaskForm) => {
        try {
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
                        status: task.status,
                    },
                },
            });

            if (result.data?.updateTask) {
                setIsSuccess(true);
                ShowToast("Success", result.data.updateTask.message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    };

    return { isSuccess, handleUpdateTask };
};

const updateTaskStatus = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useUpdateTasksStatusMutation();

    const handleUpdateTask = async (newTask: UpdateTaskStatusForm) => {
        try {
            const result = await taskMutation({
                variables: {
                    input: newTask,
                },
            });
            if (result.data?.updateTasksStatus) {
                setIsSuccess(true);
                ShowToast("Success", result.data.updateTasksStatus.message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    };

    return { isSuccess, handleUpdateTask };
}

const deleteTasks = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [taskMutation] = useDeleteTasksMutation();

    const handleDeleteTasks = async (tasksToDelete: string[]) => {
        try {
            if (tasksToDelete.length === 0) return;

            const result = await taskMutation({
                variables: {
                    input: tasksToDelete,
                },
            });

            if (result.data?.deleteTasks) {
                const message: string = tasksToDelete.length === 1 ? "Task has been deleted" : result.data.deleteTasks.message;
                setIsSuccess(true);
                ShowToast("Success", message, "success");
            }
        } catch (error) {
            const err = error as ApolloError;
            ShowToast("Error", errorHandler(err), "error");
        }
    };

    return { isSuccess, handleDeleteTasks };
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
