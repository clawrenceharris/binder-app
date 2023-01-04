import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import { auth, updateCollection } from '../../Firebase/firebase'
const BirthdaySettings = ({ route }) => {
    const navigation = useNavigation()
    const { value } = route.params
    const [month, setMonth] = useState('')
    const [day, setDay] = useState(value.day)
    const [year, setYear] = useState(value)
    console.log(route.params.value)
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

    const onSavePress = () => {
        const date = new Date(+year, +day, +month)

        updateCollection('users', auth.currentUser.uid, { birthday: date });
        navigation.goBack();
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title='Birthday'
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}

            />
            <View style={{ padding: 20 }}>
                <Text style={styles.description}>{descriptions.birthday}</Text>

                <View style={styles.birthdayInputContainer}>


                    <View style={{ width: '25%' }}>
                        <TextInput
                            placeholder='MM'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={month}
                            onChangeText={setMonth}
                            placeholderTextColor={'#00000040'}
                            selectionColor={Colors.accent}


                        />

                    </View>

                    <View style={{ width: '25%', marginLeft: 15 }}>
                        <TextInput
                            placeholder='DD'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}
                            placeholderTextColor={'#00000040'}
                            selectionColor={Colors.accent}


                        />

                    </View>

                    <View style={{ width: '40%', marginLeft: 15 }}>
                        <TextInput
                            placeholder='YYYY'
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType={'number-pad'}
                            placeholderTextColor={'#00000040'}
                            selectionColor={Colors.accent}


                        />

                    </View>



                </View>
                <Text style={styles.finePrint}>You must be at least 12 years old to use Binder</Text>

                <Button
                    title={'Save'}
                    background={Colors.light.primary}
                    tint={'white'}
                    style={{ margin: 20 }}
                    onPress={onSavePress}
                    disabled={!isValidMonth(month) || !isValidDay(day) || !isValidYear(year)}
                    width={'100%'}

                />

            </View>








        </View>
    )
}

export default BirthdaySettings