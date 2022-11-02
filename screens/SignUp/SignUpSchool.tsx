import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import DatePicker from 'react-native-date-picker'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'

const SignUpSchool = ({ navigation }) => {
    const route = useRoute()
    const colorScheme = useColorScheme()
    const [school, setSchool] = useState(null)
    const [year, setYear] = useState('')
    const [GPA, setGPA] = useState('')
    const [secondSchool, setSecondSchool] = useState(null)
    const onNextPressed = () => {

        navigation.navigate('SignUpPhoto', { ...route.params, school: school, secondSchool: secondSchool, gradYear: +year, gpa: GPA })
    }

    const isValidYear = (year) => {
        if (!year)
            return true
        else if (year >= new Date().getFullYear()) {
            return true
        }

        return false

    }


    const onBackPressed = () => {
        navigation.goBack()
    }
    const updateSchool = (item) => {
        if (secondSchool != item)
            setSchool(item)
    }

    const updateSecondSchool = (item) => {
        if (school != item)
            setSecondSchool(item)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 30 }}>

                <Text style={styles.screenTitle}>{"What school do you go to?"}</Text>
                <Text style={styles.description}>{descriptions.school}</Text>
                <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>

                    {!school ? <TouchableOpacity
                        onPress={() => { navigation.navigate('SchoolPicker', { update: updateSchool }) }}
                        style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={assets.school} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>Select a School</Text>
                    </TouchableOpacity>

                        :
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('SchoolPicker', { update: updateSchool }) }}
                                style={{ flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={assets.pencil} style={{ width: 20, height: 20, tintColor: 'white' }} />
                                <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{school.name}</Text>
                            </TouchableOpacity>


                        </View>

                    }
                    {!secondSchool ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }}>
                        <Text style={styles.finePrint}>{'Part of Dual Enrollment?'}</Text>

                        <Text
                            onPress={() => navigation.navigate('SchoolPicker', { update: updateSecondSchool })}
                            style={[styles.finePrint, { color: Colors.light.primary }]}>{' Tap to add a second school'}</Text>
                    </View>

                        :
                        <TouchableWithoutFeedback
                            onPress={() => { navigation.navigate('SchoolPicker', { update: updateSecondSchool }) }}
                        >

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 15 }}>
                                <Image source={assets.pencil} style={{ width: 14, height: 14, tintColor: Colors.light.primary }} />
                                <Text style={{ fontFamily: 'Kanit', color: Colors.light.primary, marginLeft: 10 }}>{secondSchool.name}</Text>

                            </View>
                        </TouchableWithoutFeedback>


                    }



                    <View style={{ width: '50%', marginTop: 30 }}>
                        <Text style={styles.textInputTitle}>GRADUATION YEAR</Text>
                        <TextInput
                            placeholder='YYYY'
                            style={styles.input}
                            keyboardType={'number-pad'}
                            value={year}
                            onChangeText={setYear}
                            placeholderTextColor={'#464646'}
                            returnKeyLabel='done'
                            focusable={false}
                            enablesReturnKeyAutomatically
                            returnKeyType='done'

                        />

                    </View>



                    <View style={{ width: '20%', marginTop: 30 }}>
                        <Text style={styles.textInputTitle}>GPA</Text>
                        <TextInput
                            placeholder='0.00'
                            style={styles.input}
                            value={GPA}
                            onChangeText={setGPA}
                            keyboardType={'numeric'}
                            onTouchCancel={() => { console.log("CANCEL") }}
                            placeholderTextColor={'#464646'}
                            returnKeyType='done'


                        />



                    </View>
                    <Text style={[styles.finePrint, { textAlign: 'left', width: '80%' }]}>
                        We'll use this information to help pair you with recommended study partners. You can choose to leave both these fields blank.
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={school && isValidYear(year) ? 0.3 : 1}
                    style={[styles.continueBtn, { backgroundColor: school && isValidYear(year) ? Colors.light.primary : 'lightgray' }]}
                    onPress={school && isValidYear(year) ? onNextPressed : () => { }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}




export default SignUpSchool

