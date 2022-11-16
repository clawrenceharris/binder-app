import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ClassProfileCircle from './ClassProfileCircle'
import { SHADOWS } from '../constants/Theme'
import { assets } from '../constants'



const SchoolListItemToJoin = ({ school, isSelected, onSelect, buttonTitle = 'Add' }) => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>

                <View style={styles.headerLeft}>
                    <Image source={assets.school} style={{ width: 28, height: 28, tintColor: Colors.light.primary, marginBottom: 5 }} />
                    <Text style={[styles.className, { color: Colors.light.primary, marginLeft: 10, width: '72%' }]}>{school.name} </Text>
                </View>


                <TouchableOpacity onPress={onSelect} style={{ position: 'absolute', right: 10 }}>

                    <View style={!isSelected && styles.addBtn}>
                        {!isSelected ? <Text style={{ color: 'white', fontFamily: 'KanitMedium' }}>{buttonTitle}</Text>
                            :
                            <View style={styles.selected}>

                                <Image source={assets.check} style={{ width: 28, height: 28, tintColor: Colors.light.accent }} />
                            </View>

                        }
                    </View>
                </TouchableOpacity>

            </View>


            <View style={styles.bottomContainer}>
                {school.location && <View style={{ flexDirection: 'row' }}>

                    <Image source={assets.pin} style={{ width: 15, height: 15, tintColor: 'gray' }} />
                    <Text style={{ fontFamily: 'Kanit', fontSize: 12, color: 'gray', marginLeft: 5 }}>{school.location}</Text>
                </View>

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
    mainContainer: {
        marginBottom: 30,
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: -1,
        backgroundColor: '#F2F2F2',
        shadowColor: '#272727',
        shadowRadius: 2,

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit'



    },

    headerContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        ...SHADOWS.light,
        shadowOpacity: 0.6,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default SchoolListItemToJoin