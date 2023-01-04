import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { ChatRoom, Class, School } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ProfileButton from './ProfileButton'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { assets } from '../constants'


interface Props {
    onPress?: () => void;
    onSelect?: () => void;
    school: School;
    isSelected?: boolean;


}

const SchoolListItem: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']





    return (




        <TouchableOpacity
            onPress={props.onPress}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 15, marginBottom: 20, justifyContent: 'space-between' }}>


            <View style={{ flexDirection: 'row' }}>
                <Image source={assets.school} style={{ width: 28, height: 28, tintColor: Colors.accent }} />

                <Text style={[styles.className, { color: Colors.accent, marginLeft: 10 }]}>{props.school?.name} </Text>
                {/* <ActivePeople userCount={props.school.users.length} activeCount={props.school.active.length} /> */}
            </View>
            <TouchableOpacity onPress={props.onSelect} >

                <View style={!props.isSelected && styles.addBtn}>
                    {!props.isSelected ? <Text style={{ color: 'white', fontFamily: 'KanitMedium' }}>{"Add"}</Text>
                        :
                        <View style={styles.selected}>

                            <Image source={assets.check} style={{ width: 28, height: 28, tintColor: Colors.accent }} />
                        </View>

                    }
                </View>
            </TouchableOpacity>
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
    },
    selected: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: Colors.accent,
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
        backgroundColor: Colors.accent,
        borderRadius: 50

    },
})
export default SchoolListItem