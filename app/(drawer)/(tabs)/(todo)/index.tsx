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
import { timestampToDateString, getDayOfWeek } from '@/utils/dateHandler';

const TodoList: React.FC = () => {
    const navigate = useRouter();
    const todayDate = timestampToDateString(new Date());
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

    const [progress, setProgress] = useState<string>();

    const fetchData = async () => {
        const data = await refetchTask();
        if (data.data) {
            const tasksWithChecked = data.data.tasksByDate.map((task) => ({
                ...task,
                checked: false,
            }));
            setTasks(tasksWithChecked);
            const completeTask = data.data.tasksByDate.filter((task) => {
                return task.status === TaskStatus.COMPLETED;
            })
            const percent = (completeTask.length / data.data.tasksByDate.length) * 100
            if (percent) {
                setProgress(`${Math.trunc(percent)}%`)
            } else {
                setProgress('0%')
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFocused]);

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
                        pathname: "/[id]",
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
            {!multipleSelected && (
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
            )}
            </View>
        </View>
    );
    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
                <LinearGradient
                    colors={["#BCE1EE", "#E5F700"]}
                    style={styles.card}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderTitle}>
                            Today's Progress
                        </Text>
                        <View style={styles.cardCalendar}>
                            <Text style={styles.cardHeaderDate}>{todayDate}</Text>
                            <Text style={styles.cardHeaderDay}>{todayDay}</Text>
                        </View>
                    </View>
                    <View style={styles.progressSection}>
                        <View style={styles.progressTitleContainer}>
                            <Text style={styles.progressTitle}>Progress</Text>
                            <Text style={styles.progressPercent}>{progress}</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, {
                                width: progress as ViewStyle["width"],
                            }]}></View>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.listHeader}>
                    <Text style={[styles.listHeaderText, {
                        color: colors.primaryTextColor
                    }]}>
                        Today Tasks
                    </Text>
                    {multipleSelected && (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={deselectAllTasks}
                                style={{
                                    marginRight: 10
                                }}
                            >
                                <Text style={{color: colors.primaryTextColor}}> Unselect All</Text>
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
                </View>

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
                            pathname: '/create',
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
    },
    //Card Styles
    card: {
        borderRadius: 12,
        padding: 20,
        margin: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    cardHeaderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#05445E",
    },
    cardCalendar: {
        width: 100
    },
    cardHeaderDate: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#05445E",
        textAlign: 'right'
    },
    cardHeaderDay: {
        fontSize: 12,
        color: "#05445E",
        opacity: 0.8,
        textAlign: 'right'
    },
    progressSection: {

    },
    progressTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressTitle: {
        color: "#05445E",
        fontSize: 13
    },
    progressPercent: {
        color: "#05445E",
        fontSize: 13
    },

    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: "#D1F1FF",
        marginTop: 5,
        borderRadius: 10,
        position: 'relative'
    },
    progressFill: {

        height: 20,
        borderRadius: 10,
        backgroundColor: "#0074D9",
    },
    //Card Styles
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginHorizontal: 'auto',
        alignItems: 'center'
    },
    listHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5
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

export default TodoList;
