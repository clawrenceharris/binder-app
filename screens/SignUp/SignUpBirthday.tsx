import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useColorScheme from '../../hooks/useColorScheme'
import DatePicker from 'react-native-date-picker'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { assets, Colors } from '../../constants'
import { styles } from '.'
import Button from '../../components/Button'

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 30 }}>

                <Text style={styles.screenTitle}>When's your birthday?</Text>


                <View style={styles.birthdayInputContainer}>


                    <View style={{ width: '25%' }}>
                        <Text style={styles.textInputTitle}>MONTH</Text>
                        <TextInput
                            placeholder='MM'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={month}
                            onChangeText={setMonth}
                            placeholderTextColor={'#464646'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>

                    <View style={{ width: '25%', marginLeft: 15 }}>
                        <Text style={styles.textInputTitle}>DAY</Text>
                        <TextInput
                            placeholder='DD'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}
                            placeholderTextColor={'#464646'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>

                    <View style={{ width: '40%', marginLeft: 15 }}>
                        <Text style={styles.textInputTitle}>YEAR</Text>
                        <TextInput
                            placeholder='YYYY'
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType={'number-pad'}
                            placeholderTextColor={'#464646'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>



                </View>
                <Text style={styles.finePrint}>You must be at least 12 years old to use Binder</Text>



                <Button
                    title={'Continue'}
                    background={styles.continueBtn.backgroundColor}
                    tint={'white'}
                    margin={40}
                    onPress={onNextPressed}
                    condition={isValidMonth(month) && isValidDay(day) && isValidYear(year)}
                    width={styles.continueBtn.width}

                />

            </View>
        </SafeAreaView>
    )
}



export default SignUpBirthday

