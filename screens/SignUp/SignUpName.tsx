import { View, Text, Image, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { TouchableOpacity, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { styles } from '.'
import { updateUserProfile } from '../../Firebase/firebase'

const SignUpName = ({ navigation }) => {
    const route = useRoute()
    const colorScheme = useColorScheme()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const onNextPressed = () => {
        navigation.navigate('SignUpBirthday', { firstName: firstName, lastName: lastName, ...route.params })
    }

    const onBackPressed = () => {
        navigation.goBack()
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            {/* <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback> */}

            <View style={{ padding: 30 }}>

                <Text style={styles.screenTitle}>Tell us your name.</Text>

                <View style={{ alignItems: 'center', width: '100%', padding: 20, marginTop: 40 }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: 'lightgray', alignSelf: 'flex-start', fontSize: 12 }}>FIRST NAME</Text>
                        <TextInput
                            placeholder=''
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            selectionColor={Colors.light.primary}

                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={{ color: 'lightgray', alignSelf: 'flex-start', fontSize: 12 }}>LAST NAME</Text>
                        <TextInput
                            placeholder=''
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            selectionColor={Colors.light.primary}

                        />
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={firstName || lastName ? 0.3 : 1}
                    style={[styles.continueBtn, { backgroundColor: firstName || lastName ? Colors.light.primary : 'lightgray' }]}
                    onPress={firstName || lastName ? onNextPressed : () => { }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    )
}


export default SignUpName
