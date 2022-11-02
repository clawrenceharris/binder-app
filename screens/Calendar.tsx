import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/index.ts'
import useColorScheme from '../hooks/useColorScheme';

const Calendar = () => {
    const colorScheme = useColorScheme();

    return (
        <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', height: '100%' }}>
        </View>
    )
}

export default Calendar