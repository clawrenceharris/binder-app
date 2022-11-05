import { View, Text, Image, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { TouchableOpacity, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { styles } from '.'
import { updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'

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


                    <Button
                        title={'Continue'}
                        background={styles.continueBtn.backgroundColor}
                        tint={'white'}
                        margin={40}
                        onPress={onNextPressed}
                        condition={firstName || lastName}
                        width={styles.continueBtn.width}

                    />

                </View>




            </View>
        </SafeAreaView>

    )
}


export default SignUpName
