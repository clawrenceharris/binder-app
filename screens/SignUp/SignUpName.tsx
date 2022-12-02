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

const SignUpName = ({ navigation }) => {
    const route = useRoute()
    const [displayName, setDisplayName] = useState('')

    const onNextPressed = () => {
        navigation.navigate('SignUpBirthday', { displayName: displayName, ...route.params })
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.accent }}>
            <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={styles.screenTitle}>{"Tell us your name"}</Text>
                <Text style={styles.description}>{descriptions.name}</Text>

            </View>


            <View style={{ padding: 20, alignItems: 'center', backgroundColor: Colors.light.accent, borderRadius: 15, justifyContent: 'center' }}>
                <View style={{ width: '100%' }}>
                    <TextInput
                        placeholder='Name'
                        style={styles.input}
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholderTextColor={'#00000090'}

                        selectionColor={Colors.light.primary}

                    />
                </View>



                <Button
                    onPress={onNextPressed}
                    title={'Continue'}
                    style={{ borderRadius: 15, margin: 20 }}
                    disabled={!displayName}

                />





            </View>
        </SafeAreaView>

    )
}


export default SignUpName
