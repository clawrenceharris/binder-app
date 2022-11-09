import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ClassProfileCircle from './ClassProfileCircle'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { assets } from '../constants'
import { auth, db } from '../Firebase/firebase'


const ClassListItemToJoin = ({ Class, isSelected, onSelect }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [classData, setClassData] = useState(null)


    const onPress = () => {


    }

    useEffect(() => {
        console.log("CLASS", Class.id)

        //if this class id is equal to the users class id
        const subscriber = db.collection('classes')
            .doc(Class.id)
            .onSnapshot(doc =>
                setClassData(doc.data()))








        return () => {
            subscriber()
        }
    }, [])



    return (


        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.mainContainer}>


                <View style={styles.headerContainer}>


                    <View style={styles.headerLeft}>
                        <ClassProfileCircle Class={Class} story={[]} showStoryBoder={false} size={40} showName bold />
                        <Text style={[styles.className, { color: Colors.light.accent, marginLeft: 10, width: '72%' }]}>{classData?.name} </Text>
                    </View>


                    <TouchableOpacity onPress={onSelect} style={{ position: 'absolute', right: 10 }}>

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

                <View style={styles.bottomContainer}>

                    <Text style={{ fontFamily: 'Kanit', fontSize: 12, color: 'gray', marginLeft: 5 }}>Teacher: {classData?.teacher}</Text>

                </View>
            </View>


        </TouchableWithoutFeedback>

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
        borderRadius: 50,


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
        ...SHADOWS.light,
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
export default ClassListItemToJoin