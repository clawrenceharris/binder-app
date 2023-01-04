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
import Input from '../../components/Input'
import Header from '../../components/Header'

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
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}
            />
            <View style={{ height: '25%', alignItems: 'center', justifyContent: 'center' }}>

                <Text style={styles.screenTitle}>{"When's your birthday?"}</Text>
                <Text style={[styles.description, { color: 'white', padding: 10 }]}>{descriptions.birthday}</Text>

            </View>
            <View style={{ padding: 30 }}>



                <View style={styles.birthdayInputContainer}>


                    <View style={{ width: '25%' }}>
                        <Input
                            placeholder='MM'
                            keyboardType={'number-pad'}
                            value={month}
                            onChangeText={setMonth}
                            style={{ color: 'white' }}


                        />

                    </View>

                    <View style={{ width: '25%' }}>
                        <Input
                            placeholder='DD'
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}
                            style={{ color: 'white' }}
                        />
                    </View>

                    <View style={{ width: '40%' }}>
                        <Input
                            placeholder='YYYY'
                            keyboardType={'number-pad'}
                            value={year}
                            onChangeText={setYear}
                            style={{ color: 'white' }}


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
        </View>
    )
}



export default SignUpBirthday

