import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import Button from '../components/Button'
import { SHADOWS } from '../constants/Theme'

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ height: 70 }} />


            <Image source={assets.logo} style={{ width: 180, height: 180 }} />
            <View style={{ width: '100%', alignItems: 'center', padding: 50 }}>
                <Button
                    onPress={() => navigation.navigate('SignIn')}
                    style={{ marginTop: 20, width: '100%', borderRadius: 15, ...SHADOWS.dark, shadowColor: '#870290' }}
                    title={'Log In'}

                />
                <Button
                    onPress={() => navigation.navigate('SignUpEmailPassword')}
                    style={{ marginTop: 20, width: '100%', backgroundColor: 'white', borderRadius: 15, ...SHADOWS.dark, shadowColor: '#870290' }}
                    tint={'black'}
                    title={'Sign Up'}

                />






            </View>

        </SafeAreaView>
    )
}

export default StartScreen