import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import { ChatRoom, Class } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ClassProfileCircle from './ClassProfileCircle'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { assets } from '../constants'
import { TouchableOpacity } from '@gorhom/bottom-sheet'


const SchoolListItem = ({ school, onPress }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']





    return (


        <TouchableOpacity onPress={onPress} >
            <View style={{ marginBottom: 20 }}>


                <View style={{ backgroundColor: colorScheme === 'light' ? 'white' : 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2 }}>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', padding: 10 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={assets.school} style={{ width: 28, height: 28, tintColor: Colors[colorScheme].primary }} />
                            <View>
                                <Text style={[styles.className, { color: Colors[colorScheme].primary, marginLeft: 10 }]}>{school.name} </Text>
                                <View style={{ marginLeft: 10 }}>
                                    <ActivePeople userCount={school.users.length} activeCount={school.active.length} />

                                </View>
                            </View>


                        </View>

                    </View>

                </View>

                <View style={[styles.container, { backgroundColor: colorScheme === 'light' ? '#F2F2F2' : '#F2F2F2', shadowColor: '#272727' }]}>

                    <Text style={{ fontFamily: 'KanitMedium', fontSize: 20, color: Colors.light.accent }}>No Recent Activity</Text>

                </View>
            </View>


        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },




    messageContent: {
        marginLeft: 10
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: -1,

        shadowRadius: 2,
        shadowColor: '#272727',
        justifyContent: 'center'

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit'



    }
})
export default SchoolListItem