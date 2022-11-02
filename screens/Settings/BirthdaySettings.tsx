import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { descriptions, styles } from '.'
const BirthdaySettings = ({ route }) => {
    const navigation = useNavigation()
    const { value, fieldName, title, description, onSubmit } = route.params
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                title='Birthday'
                navigation={navigation}

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
                            placeholderTextColor={'#6F6F6F'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>

                    <View style={{ width: '25%', marginLeft: 15 }}>
                        <TextInput
                            placeholder='DD'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={day}
                            onChangeText={setDay}
                            placeholderTextColor={'#6F6F6F'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>

                    <View style={{ width: '40%', marginLeft: 15 }}>
                        <TextInput
                            placeholder='YYYY'
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType={'number-pad'}
                            placeholderTextColor={'#6F6F6F'}
                            selectionColor={Colors.light.primary}


                        />

                    </View>



                </View>
            </View>






        </View>
    )
}

export default BirthdaySettings