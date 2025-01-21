import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from '../components/TaskForm';
import { EditTaskForm } from '@/types';
import { updateTask, getTask } from '@/hooks/useTask';

const Edit: React.FC = () => {

    const [initialValue, setInitialValue] = useState<EditTaskForm>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter(); // Corrected naming for better clarity
    const { colors } = useThemeContext();
    const { id } = useLocalSearchParams(); // Extracted `id` from route params
    const { task } = getTask(id as string); // Handle errors if `getTask` fails
    const { setTask } = updateTask();

    useEffect(() => {
        if (task) {
            setInitialValue(task);
        }
    }, [id, task]);

    // Handle form submission
    const handleForm = async (data: EditTaskForm) => {
        try {
            setIsLoading(true);
            setTask(data); 
            router.navigate({
                pathname: "/pages",
            })
        } catch (error) {
            console.error("Failed to save the task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            {initialValue && (
                <TaskForm
                initialValue={initialValue}
                handleForm={handleForm}
                loading={isLoading}
                mode="edit"
                />
            )}
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default Edit;
