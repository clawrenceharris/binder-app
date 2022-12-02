import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useColorScheme from '../../hooks/useColorScheme'
import DatePicker from 'react-native-date-picker'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { assets, Colors } from '../../constants'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'

const SignUpBirthday = ({ navigation }) => {
    const route = useRoute()

    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')

    const onNextPressed = () => {
        const date = new Date(+year, +day, +month, 0, 0, 0, 0)

        navigation.navigate('SignUpSchool', { ...route.params, birthday: date })
    }

    const isValidDay = (data) => {
        if (+data >= 1 && +data <= 31) {
            return true
        }
        return false
    }

    const isValidMonth = (data) => {
        if (+data >= 1 && +data <= 12) {
            return true
        }
        return false
    }

    const isValidYear = (data) => {
        if (+data >= 1898 && +data <= 2011) {
            return true
        }
        return false
    }



    const onBackPressed = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.accent }}>
            <BackButton
                navigation={navigation}
                margin={20}
            />
            <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={styles.screenTitle}>{"When's your birthday?"}</Text>
                <Text style={[styles.description, { color: 'white', padding: 10 }]}>{descriptions.birthday}</Text>

            </View>
            <View style={{ padding: 30 }}>



                <View style={styles.birthdayInputContainer}>


                    <View style={{ width: '25%' }}>
                        <TextInput
                            placeholder='MM'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={month}
                            onChangeText={setMonth}
                            placeholderTextColor={'#00000090'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>

                    <View style={{ width: '25%' }}>
                        <TextInput
                            placeholder='DD'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}
                            placeholderTextColor={'#00000090'}
                            selectionColor={Colors.light.primary}
                        />

                    </View>

                    <View style={{ width: '40%' }}>
                        <TextInput
                            placeholder='YYYY'
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType={'number-pad'}
                            placeholderTextColor={'#00000090'}
                            selectionColor={Colors.light.primary}
                        />

                    </View>



                </View>



                <Button
                    title={'Continue'}
                    onPress={onNextPressed}
                    style={{ borderRadius: 15, margin: 40 }}
                    disabled={!isValidMonth(month) || !isValidDay(day) || !isValidYear(year)}
                />

            </View>
        </SafeAreaView>
    )
}



export default SignUpBirthday

