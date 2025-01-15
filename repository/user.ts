import { UserInput } from "@/domain/graphql/input/UserInput";
import { useUserCreateMutation } from "@/domain/graphql/mutation/user";
import { useRouter } from "expo-router";

export default function UserRepository() {
    const router = useRouter();
    const [createUser, { loading, error }] = useUserCreateMutation();

    const create = async (data: UserInput) => {
        try {
            const result = await createUser({
                variables: {
                    input: data,
                },
            });

            if (result.data) {
                console.log("User created successfully!");
                router.replace("/(drawer)/(tabs)/(user)/pages");
            } else {
                console.log("Failed to create user: No data returned.");
            }
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    return {
        create,
        loading,
        error,
    };
}
