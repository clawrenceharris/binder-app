import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Playground = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                title={'Playgrounds'}
                shadow

            />

            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center' }}>{'Playgrounds is where you can socialize and study with students from other schools. Play fun study games, join study groups and more!'}</Text>
            </View>
        </View>
    )
}

export default Playground