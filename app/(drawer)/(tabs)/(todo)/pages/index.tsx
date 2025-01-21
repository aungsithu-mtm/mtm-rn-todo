import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import { SearchInput } from '@/components/Form'
import { useRouter } from "expo-router";
import { createUser, getUsers } from '@/hooks/useUser';
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from '@react-navigation/native';
import { Task } from '@/types';
import { getTasks } from '@/hooks/useTask';

const MemberList: React.FC = () => {

    const navigate = useRouter();
    const { colors } = useThemeContext();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [tasks, setTasks] = useState<[Task]>();
    const [filterTasks, setFilterTasks] = useState<Task[]>();
    const [multipleSelected, setMultipleSelected] = useState<boolean>(false);
    const { setUser } = createUser();
    const { refetchTask } = getTasks();

    useEffect(() => {
        const fetchData = async () => {
            const data = await refetchTask();
            if (data.data) {
                const tasksWithChecked = data.data.tasks.map((task) => ({
                    ...task,
                    checked: false,
                }));
                setTasks(data.data.tasks);
                setMultipleSelected(false);
            }
        };
        fetchData();
    }, [isFocused]);


    const renderItem = ({ item }: { item: Task }) => (
        <TouchableOpacity
            onPress={() =>
                navigate.navigate({
                    pathname: "/pages/[id]",
                    params: { id: item._id },
                })
            }
            style={[styles.taskCard, { backgroundColor: colors.primaryBgColor2 }]}
        >
            <View style={styles.info}>
                <Text style={[styles.title, { color: colors.primaryTextColor }]}>{item.title}</Text>
                {(item.fromTime || item.toTime) && (
                    <Text style={[styles.time, { color: colors.primaryTextColor }]}>
                        {item.fromTime} - {item.toTime}
                    </Text>
                )}
            </View>
            <View style={styles.actions}>

                <AntDesign
                    name="right"
                    size={18}
                    color={colors.primaryTextColor} />
            </View>
        </TouchableOpacity>
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
                            <Text style={styles.cardHeaderDate}>20-01-2025</Text>
                            <Text style={styles.cardHeaderDay}>Monday</Text>
                        </View>
                    </View>
                    <View style={styles.progressSection}>
                        <View style={styles.progressTitleContainer}>
                            <Text style={styles.progressTitle}>Progress</Text>
                            <Text style={styles.progressPercent}>50%</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill}></View>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.listHeader}>
                    <Text style={[styles.listHeaderText, {
                        color: colors.primaryTextColor
                    }]}>
                        Today Tasks
                    </Text>
                    {/* <View style={styles.searchContainer}>
                        <SearchInput setSearchInput={setSearchInput} />
                    </View> */}
                </View>

                <FlatList
                    data={searchInput ? filterTasks : tasks}
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
        width: '50%',
        height: 20,
        borderRadius: 10,
        backgroundColor: "#0074D9",
    },
    //Card Styles
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginHorizontal: 'auto'
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

export default MemberList;
