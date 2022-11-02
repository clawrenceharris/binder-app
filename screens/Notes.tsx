import { View, Text } from 'react-native'
import React from 'react'
import NotesComponent from '../components/Notes'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
const Notes = ({ route }) => {
    const colorScheme = useColorScheme()
    return (
        <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>
            <NotesComponent />
        </View>
    )
}

export default Notes