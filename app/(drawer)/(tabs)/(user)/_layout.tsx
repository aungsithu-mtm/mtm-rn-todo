import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="pages/index" options={{ headerShown: false }} />
            <Stack.Screen
                name="pages/userDetail"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="pages/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }} />
        </Stack>
    )
}

export default _layout