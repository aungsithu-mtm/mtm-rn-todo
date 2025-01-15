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
        </Stack>
    )
}

export default _layout