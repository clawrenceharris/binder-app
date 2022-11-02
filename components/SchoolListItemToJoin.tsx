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

import { faker } from '@faker-js/faker';

const SchoolListItem = ({ school, isSelected, onPress, onSelect }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']


    console.log(isSelected)


    return (


        <View style={{ marginBottom: 30, padding: 10 }}>


            <View style={{ padding: 10, flexDirection: 'row', backgroundColor: colorScheme === 'light' ? 'white' : 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2, alignItems: 'center', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={assets.school} style={{ width: 28, height: 28, tintColor: Colors[colorScheme].primary, marginBottom: 5 }} />
                    <Text style={[styles.className, { color: Colors[colorScheme].primary, marginLeft: 10, width: '72%' }]}>{school.name} </Text>
                </View>


                <TouchableOpacity onPress={onSelect}>

                    <View style={!isSelected && styles.addBtn}>
                        {!isSelected ? <Text style={{ color: 'white', fontFamily: 'KanitMedium' }}>Add</Text>
                            :
                            <View style={styles.selected}>

                                <Image source={assets.check} style={{ width: 28, height: 28, tintColor: Colors.light.accent }} />
                            </View>

                        }
                    </View>
                </TouchableOpacity>

            </View>




            <View style={[styles.container, { backgroundColor: colorScheme === 'light' ? '#F2F2F2' : '#F2F2F2', shadowColor: '#272727' }]}>
                {school.location ? <View style={{ flexDirection: 'row' }}>

                    <Image source={assets.pin} style={{ width: 15, height: 15, tintColor: 'gray' }} />
                    <Text style={{ fontFamily: 'Kanit', fontSize: 12, color: 'gray', marginLeft: 5 }}>{school.location}</Text>
                </View>
                    :
                    <View style={{ height: 16 }}></View>

                }

            </View>
        </View>



    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },


    selected: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: Colors.light.accent,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addBtn: {
        alignSelf: 'flex-end',
        padding: 8,
        width: 60,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
            Colors.light.accent,
        borderRadius: 50

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

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit'



    }
})
export default SchoolListItem