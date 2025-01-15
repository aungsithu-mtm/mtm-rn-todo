import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { DarkTheme } from '@react-navigation/native';
import FormModal from '@/components/FormModal';
import UserCreateForm from '../components/UserCreateForm';
import { AddUserForm, UserForm } from '@/types';
import { useRouter } from "expo-router";
import { UserInput } from '@/domain/graphql/input/UserInput';
import UserRepository from '@/repository/user';

type Member = {
    id: string;
    name: string;
    email: string;
    image: string;
};

const MemberList: React.FC = () => {
    const navigate = useRouter();
    const { colors } = useThemeContext();
    const { create, loading, error } = UserRepository();

    const [members, setMembers] = useState<Member[]>([
        { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/women/27.jpg', email: '27@gmail.com' },
        { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/28.jpg', email: '28@gmail.com' },
        { id: '3', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/men/29.jpg', email: '29@gmail.com' },
        { id: '4', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/women/30.jpg', email: '29@gmail.com' },
        { id: '5', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/men/31.jpg', email: '29@gmail.com' },
        { id: '6', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/women/32.jpg', email: '29@gmail.com' },
        { id: '7', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/men/33.jpg', email: '29@gmail.com' },
        { id: '8', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/women/34.jpg', email: '29@gmail.com' },
        { id: '9', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/women/35.jpg', email: '29@gmail.com' },
        { id: '10', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/men/36.jpg', email: '29@gmail.com' },
        { id: '11', name: 'Sam Wilson', image: 'https://randomuser.me/api/portraits/women/37.jpg', email: '29@gmail.com' },
    ]);

    const initialValue: AddUserForm = {
        username: "aungthu",
        email: "aungthu@gmail.com",
        password: '',
    }

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCreate = async (data: UserInput) => {
        try {
            console.log(data)
            await create(data);
            Alert.alert("Success", "User created successfully!");
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to create user. Please try again.");
        }
    }

    const handleDelete = (id: string) => {
        Alert.alert('Delete Member', 'Are you sure you want to delete this member?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id)),
                style: 'destructive',
            },
        ]);
    };

    const handleEdit = (id: string) => {
        Alert.alert('Edit Member', `Edit member with ID: ${id}`);
    };

    const renderItem = ({ item }: { item: Member }) => (
        <TouchableOpacity
            onPress={() => navigate.push({
                pathname: "/pages/userDetail",
                params: {
                    userId: item.id,
                    userName: item.name,
                    userEmail: item.email,
                    userImage: item.image
                },
            })}
            style={[styles.card, { backgroundColor: colors.primaryBgColor2 }]}
        >
            <Image source={{ uri: item.image }} style={styles.photo} />
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.primaryTextColor }]}>{item.name}</Text>
                <Text style={{ color: colors.primaryTextColor }}>{item.email}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
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
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={[styles.list]}
            />
            <TouchableOpacity
                onPress={() => setIsOpen(true)}
                style={[styles.addBtn, { backgroundColor: colors.primaryBgColor }]}
            >
                <AntDesign
                    name="pluscircle"
                    size={64}
                    color={colors.secondary}
                    style={{}}
                />

            </TouchableOpacity>
            <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <UserCreateForm
                    handleForm={(data) => handleCreate(data)}
                    initialValue={initialValue}
                    setIsOpen={setIsOpen}
                    loading={loading}
                />
            </FormModal>
        </View>
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
