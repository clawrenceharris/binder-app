import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'

const SchoolSettings = ({ route }) => {
    const navigation = useNavigation()
    const [school, setSchool] = useState(route.params.school)
    const [secondSchool, setSecondSchool] = useState(route.params.secondSchool)
    const updateSchool = (item) => {
        if (secondSchool != item)
            setSchool(item)
    }

    const updateSecondSchool = (item) => {
        if (school != item)
            setSecondSchool(item)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: SIZES.header, padding: 5, backgroundColor: '#333' }}>
                <View style={{ position: 'absolute', left: 0, paddingTop: 30 }}>
                    <BackButton navigation={navigation} margin={5} color={'white'} direction={'horizontal'} />

                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>


                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}>School</Text>

                </View>


            </View>
            <Text style={styles.description}>{descriptions.school}</Text>

            <View style={{ marginTop: 30 }}>

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
            </View>



        </View>
    )
}

export default SchoolSettings