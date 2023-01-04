import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { TouchableOpacity, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Input from '../../components/Input'

const SignUpName = ({ navigation }) => {
    const route = useRoute()
    const [displayName, setDisplayName] = useState('')
    const colorScheme = useColorScheme()
    const onNextPressed = () => {
        navigation.navigate('SignUpBirthday', { displayName: displayName, ...route.params })
    }





    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={styles.screenTitle}>{"Tell us your name"}</Text>
                <Text style={styles.description}>{descriptions.name}</Text>

            </View>


            <View style={{ padding: 30, justifyContent: 'center', height: '50%' }}>

                <View style={{ width: '100%' }}>
                    <Input
                        placeholder='Name'
                        style={{ color: 'white' }}
                        value={displayName}
                        onChangeText={setDisplayName}

                    />
                </View>



                <Button
                    onPress={onNextPressed}
                    title={'Continue'}
                    style={{ borderRadius: 15, margin: 20 }}
                    disabled={!displayName}

                />


            </View>
        </View>

    )
}


export default SignUpName
