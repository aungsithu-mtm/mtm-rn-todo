import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import FormModal from '@/components/FormModal';
import UserCreateForm from '../components/UserCreateForm';
import { useRouter } from "expo-router";
import { AddUserForm, User } from '@/types';
import UserRepository from '@/repository/user';
import { createUser, getUsers, deleteUser } from '@/hooks/useUser';
import { uploadImage } from "@/utils/cloudinary";
import { useIsFocused } from '@react-navigation/native';

const MemberList: React.FC = () => {
    const initialValue: AddUserForm = {
        username: "",
        email: "",
        password: '',
        imageUrl: ''
    }
    const navigate = useRouter();
    const { colors } = useThemeContext();
    const { onCreate, loading, error } = UserRepository();
    const [isLoading, setIsLoading] = useState<boolean>(loading);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { refetchUser } = getUsers();
    const isFocused = useIsFocused();
    const [members, setMembers] = useState<[User]>();
    const { setUser } = createUser();
    const { setUserList } = deleteUser();

    const fetchData = async () => {
        console.log("HELLO I M REFETCH");
        const data = await refetchUser();
        if (data.data) {
            const members = data.data.users.map((user) => ({
                ...user,
            }));
            setMembers(data.data.users);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFocused, isOpen]);

    const handleCreate = async (data: AddUserForm) => {
        setIsLoading(true);
        try {
            if (profileImage) {
                await uploadImage(profileImage).then((img) => {
                    data = {
                        ...data,
                        imageUrl: img.url,
                    };
                });
            }
            setUser(data);
            await fetchData();
            setProfileImage(null);
            setIsOpen(false);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to create user. Please try again.");
            setIsLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        const checkedNotes = notes
            .filter((note) => note.checked)
            .map((note) => note._id);
        await setNoteList(checkedNotes);
        setNotes((prevNotes) => prevNotes.filter((note) => !note.checked));
        setMultipleSelected(false);
        setOpenModal(false);
    };

    const handleEdit = (id: string) => {
        Alert.alert('Edit Member', `Edit member with ID: ${id}`);
    };

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            onPress={() => navigate.push({
                pathname: "/pages/userDetail",
                params: {
                    userId: item._id,
                    userName: item.username,
                    userEmail: item.email,
                    userImage: item.imageUrl
                },
            })}
            style={[styles.card, { backgroundColor: colors.primaryBgColor2 }]}
        >
            {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl || "" }} style={styles.photo} />
            ) : (
                <Image source={require("@/assets/images/defaultProfile.png")} style={styles.photo} />
            )}

            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.primaryTextColor }]}>{item.username}</Text>
                <Text style={{ color: colors.primaryTextColor }}>{item.email}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <MaterialIcons
                        name='delete'
                        size={20}
                        color={colors.primaryTextColor}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
                <FlatList
                    data={members}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={[styles.list]}
                />

                <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <UserCreateForm
                        handleForm={(data) => handleCreate(data)}
                        initialValue={initialValue}
                        setIsOpen={setIsOpen}
                        loading={isLoading}
                        setProfileImage={setProfileImage}
                    />
                </FormModal>
                <TouchableOpacity
                    onPress={() => setIsOpen(true)}
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
    list: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 50,
        marginTop: 5,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 10
    },
    edit: {
        fontSize: 20,
        color: '#007BFF',
        marginRight: 10,
    },
    delete: {
        fontSize: 20,
        color: '#FF0000',
    },
    addBtn: {
        position: 'absolute',
        bottom: '10%',
        left: '75%',
        width: 64,
        borderRadius: 100,
    }
});

export default MemberList;
