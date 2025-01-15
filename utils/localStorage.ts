import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAsyncStorage = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("save async strage success: ", key)
    } catch (e) {
        console.log(e)
    }
}

export const deleteAsyncStorage = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`AsyncStorage key: ${key} deleted`);
    } catch (error) {
        console.log(error)
    }
}

export const getAsyncStorage = async (key: string): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(`Retrieved value for key ${key}:`, value);
        } else {
            console.log(`No value found for key ${key}`);
        }
        return value;
    } catch (error) {
        console.log(`Error retrieving value for key ${key}:`, error);
        return null;
    }
};
