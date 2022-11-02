import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import BackButton from '../../components/BackButton'
import { assets } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'

const GPASetttings = ({ route }) => {
    const navigation = useNavigation()
    const { value, fieldName, title, description, onSubmit } = route.params
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
            <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}></Text>


        </View>
    )
}

export default GPASetttings