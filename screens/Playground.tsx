import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ClassesHeader from '../components/ClassesHeader'

const Playground = ({ currentUser }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <ClassesHeader currentUser={currentUser} />
            <Text>Playground</Text>
        </SafeAreaView>
    )
}

export default Playground