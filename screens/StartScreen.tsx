import { View, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'KanitSemiBold', fontSize: 30, color: 'white', marginTop: 20, alignSelf: 'flex-start', margin: 20 }}>Welcome to</Text>
            <Image source={assets.logo} style={{ width: 180, height: 180 }} />

            <View style={{ marginTop: '20%', width: '100%', alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('SignIn') }}
                    style={{ width: '50%', backgroundColor: Colors.light.primary, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}>
                    <Text style={{ fontFamily: 'KanitBold', fontSize: 20, color: 'white' }}>Log In</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('SignUpEmailPassword') }}
                    style={{ marginTop: 20, width: '50%', backgroundColor: Colors.light.primary, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}>
                    <Text style={{ fontFamily: 'KanitBold', fontSize: 20, color: 'white' }}>Sign Up</Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default StartScreen