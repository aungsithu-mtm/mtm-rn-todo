import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage"

const httpLink = new HttpLink({
    uri: process.env.EXPO_PUBLIC_APOLLO_ENDPOINT,
});


const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await AsyncStorage.getItem("token");
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    } catch (error) {
        console.log("Error Retreving Token:", error);
        return {
            headers: {
                ...headers,
            }
        };
    }
});

const apolloClient = () => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });
    return client
}

export default apolloClient;