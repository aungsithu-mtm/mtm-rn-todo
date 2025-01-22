import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, ViewStyle } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import { ConfirmModal } from "@/components/Modal";
import { useIsFocused } from '@react-navigation/native';
import { Task } from '@/types';
import { TaskStatus } from '@/constants/task';
import { updateTaskStatus, getTasksByDate, deleteTasks } from '@/hooks/useTask';
import { timestampToDateString, getDayOfWeek, changeDate, formatDate } from '@/utils/dateHandler';
import { date } from 'yup';

const UpComingTask: React.FC = () => {
    const navigate = useRouter();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const todayDate = timestampToDateString(currentDate);
    const todayDay = getDayOfWeek(new Date())
    const { colors } = useThemeContext();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfirm, setIsComfirm] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [multipleSelected, setMultipleSelected] = useState<boolean>(false);
    const { refetchTask } = getTasksByDate(todayDate);
    const { handleUpdateTask } = updateTaskStatus();
    const { handleDeleteTasks } = deleteTasks();

    const fetchData = async () => {
        const data = await refetchTask();
        if (data.data) {
            const tasksWithChecked = data.data.tasksByDate.map((task) => ({
                ...task,
                checked: false,
            }));
            setTasks(tasksWithChecked)
        }
    };

    useEffect(() => {
        fetchData();
        setMultipleSelected(false)
    }, [currentDate, isFocused]);

    const handleDateChange = (status: "add" | "substract") => {
        const changedDate = changeDate(currentDate, 1, status);
        fetchData();
        setCurrentDate(changedDate);
    };

    const handleTaskStatus = async (_id: string, status: string) => {
        try {
            setIsLoading(true);
            if (status === TaskStatus.NEW) {
                await handleUpdateTask({
                    _id,
                    status: TaskStatus.COMPLETED
                })
            } else {
                await handleUpdateTask({
                    _id,
                    status: TaskStatus.NEW
                })
            }
            fetchData()
            setIsLoading(false)
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };


    const toggleNoteSelection = (id: string) => {
        setMultipleSelected(true);
        setTasks((prevTask) => {
            const updatedTask = prevTask.map((task) =>
                task._id === id ? { ...task, checked: !task.checked } : task
            );
            setMultipleSelected(updatedTask.some((note) => note.checked));
            return updatedTask;
        });
    };

    const deselectAllTasks = () => {
        setMultipleSelected(false);
        setTasks((prevTask) =>
            prevTask.map((task) => ({ ...task, checked: false }))
        );
    };

    const deleteSelectedTasks = async () => {
        const checkedNotes = tasks
            .filter((task) => task.checked)
            .map((task) => task._id);
        await handleDeleteTasks(checkedNotes);
        setTasks((prevNotes) => prevNotes.filter((note) => !note.checked));
        setMultipleSelected(false);
        setIsComfirm(false);
    };


    const renderItem = ({ item }: { item: Task }) => (
        <View
            style={[styles.taskCard, {
                backgroundColor: colors.primaryBgColor2,
                opacity: (item.status == TaskStatus.COMPLETED) ? 0.5 : 1
            }]}
        >
            {multipleSelected && (
                <Checkbox
                    value={item.checked}
                    onValueChange={() => toggleNoteSelection(item._id)}
                    color={item.checked ? colors.dark : undefined}
                    style={{
                        marginRight: 10
                    }}
                />
            )}
            <TouchableOpacity
                onPress={() =>
                    navigate.navigate({
                        pathname: "/pages/[id]",
                        params: { id: item._id },
                    })
                }
                onLongPress={() => toggleNoteSelection(item._id)}
                style={styles.info}
            >
                <Text style={[styles.title, {
                    color: colors.primaryTextColor,
                    textDecorationLine: (item.status == TaskStatus.COMPLETED) ? "line-through" : 'none'
                }]}
                >
                    {item.title}
                </Text>
                {(item.fromTime || item.toTime) && (
                    <Text style={[styles.time, { color: colors.primaryTextColor }]}>
                        {item.fromTime} - {item.toTime}
                    </Text>
                )}
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() => {
                        handleTaskStatus(item._id, item.status)
                    }}
                >
                    <AntDesign
                        name={item.status === "NEW" ? 'checkcircleo' : 'checkcircle'}
                        size={20}
                        color={colors.primaryTextColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
                <View style={styles.listHeader}>
                    <TouchableOpacity
                        onPress={() => handleDateChange("substract")}
                    >
                        <AntDesign
                            name="leftcircle"
                            size={30}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.listHeaderText, {
                            color: colors.primaryTextColor,
                            textAlign: 'center'
                        }]}>
                            {formatDate(currentDate)}
                        </Text>
                        <Text style={[styles.subHeaderText, {
                            color: colors.primaryTextColor,
                            textAlign: 'center'
                        }]}>
                            {getDayOfWeek(currentDate)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => handleDateChange("add")}
                    >
                        <AntDesign
                            name="rightcircle"
                            size={30}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
                {multipleSelected && (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        margin: 20
                    }}>
                        <TouchableOpacity
                            onPress={deselectAllTasks}
                            style={{
                                marginRight: 10
                            }}
                        >
                            <Text> Unselect All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsComfirm(true)}
                        >
                            <MaterialIcons
                                name="delete"
                                size={28}
                                color={colors.danger}
                            />
                        </TouchableOpacity>

                    </View>
                )}
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={[styles.list]}
                    ListEmptyComponent={
                        <Text style={[styles.emptyText, {
                            color: colors.secondary
                        }]}>Yay! You are free, Just take a rest</Text>
                    }
                />

                <TouchableOpacity
                    onPress={() => {
                        navigate.push({
                            pathname: '/pages/create',
                        })
                    }}
                    style={[styles.addBtn, { backgroundColor: colors.primaryBgColor }]}
                >
                    <AntDesign
                        name="pluscircle"
                        size={64}
                        color={colors.secondary}
                    />
                </TouchableOpacity>
                {isConfirm && (
                    <ConfirmModal
                        header='Delete Task'
                        message='Are you sure, you want to delete'
                        handleForm={deleteSelectedTasks}
                        btnLabel='Delete'
                        isLoading={isLoading}
                        isOpen={isConfirm}
                        setIsOpen={setIsComfirm}
                    />
                )}
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingVertical: 30
    },
    //Card Styles
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginHorizontal: 'auto',
        alignItems: 'center'
    },
    listHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 14
    },
    list: {
        width: "98%",
        marginHorizontal: 'auto',
        padding: 10,
    },
    searchContainer: {
        width: 200,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 10
    },
    addBtn: {
        position: 'absolute',
        bottom: '10%',
        left: '75%',
        width: 64,
        borderRadius: 100,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
    },
});

export default UpComingTask;
