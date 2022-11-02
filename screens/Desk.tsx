import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ClassesHeader from '../components/ClassesHeader'

const Desk = ({ currentUser }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <ClassesHeader currentUser={currentUser} />
            <Text>Desk</Text>
        </SafeAreaView>
    )
}

export default Desk