import * as SecureStore from 'expo-secure-store'

export const saveSecureStorage = async(key: string, value: string): Promise<void> => {
	try {
		await SecureStore.setItem(key, value)
		console.log("save secure storage success: ", key)
	} catch (e) {
		console.log(e)
	}
}

export const deleteSecureStorage = async(key: string): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log(`SecureStore key: ${key} deleted`);
    } catch (error) {
        console.log(error)
    }
}

export const getSecureStorage = async (key: string): Promise<string | null> => {
    try {
        const value = await SecureStore.getItem(key);
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
