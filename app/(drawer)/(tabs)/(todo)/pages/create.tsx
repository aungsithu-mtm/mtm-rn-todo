import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { useRouter } from "expo-router";
import TaskForm from '../components/TaskForm'
import { AddTaskForm } from '@/types';
import { createTask } from '@/hooks/useTask';

const MemberList: React.FC = () => {
    const initialValue: AddTaskForm = {
        title: '',
        description: '',
        date: '',
        fromTime: '',
        toTime: '',
        imageUrl: '',
        isActive: true,
    }
    const navigate = useRouter();
    const { colors } = useThemeContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setTask } = createTask();

    const handleForm = async (data: AddTaskForm) => {
        setIsLoading(true);
        setTask(data);
        setIsLoading(false);
        navigate.navigate({
            pathname: "/pages",
        })
    };

    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
                <TaskForm
                    initialValue={initialValue}
                    handleForm={(data) => handleForm(data)}
                    loading={isLoading}
                    mode="create"
                />
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});

export default MemberList;
