import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import OptionsList from './OptionsList'
import { auth, db } from '../Firebase/firebase'
import { getDisplayName, getDisplayNameOrYou } from '../utils'
import { Colors } from '../constants'
import moment from 'moment'

const ChatModal = (props) => {

    const [userData, setUserData] = useState(null)
    const reactions = ['❤️', '😂', '😍', '😭', '😮']
    const scaleValue = useRef(new Animated.Value(0)).current
    const [showModal, setShowModal] = useState(props.visible)



    const toggleModal = () => {
        if (props.visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
        else {
            setTimeout(() => setShowModal(false), 200)//wait before closing modal so close animaition can start
            setShowModal(false)
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start
        }
    }

    useEffect(() => {
        toggleModal();

        db.collection('users')
            .doc(props.message?.user)
            .get()
            .then(doc => setUserData(doc.data()))


    }, [props.message, props.visible])

    const getColor = () => {
        const users = props?.users.filter(item => item.uid === props.message?.user)
        if (users.length) {
            const user = users[0]
            return user.color
        }
        else return Colors.light.accent
    }
    return (


        <Modal
            transparent
            visible={showModal}>

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center', padding: 10 }} >


                <Animated.View style={{ alignSelf: 'center', height: 150, width: '100%', padding: 20, marginTop: '100%', transform: [{ scale: scaleValue }] }}>


                    <View style={{ backgroundColor: '#333', width: '100%', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 15, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {reactions.map((item) => <Text onPress={() => props.onReactionPress(item)} style={{ fontSize: 28 }}>{item}</Text>)}
                        </View>


                    </View>


                    <View style={{ backgroundColor: '#333', width: '100%', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 15, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'KanitMedium', color: getColor(), fontSize: 16 }}>{getDisplayNameOrYou(userData)}</Text>
                            <Text style={{ fontFamily: 'Kanit', color: 'lightgray', fontSize: 14 }}>{moment(props.message?.createdAt.toDate()).format('LT')}</Text>
                        </View>

                        <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{props?.message?.text}</Text>

                    </View>
                    <OptionsList

                        options={
                            props.message?.user === auth.currentUser.uid ?
                                ['Reply', 'Copy', 'Delete'] :
                                ['Reply', 'Copy', 'Report']}

                        onOptionPress={
                            props.message?.user === auth.currentUser.uid ?
                                [props.onReplyPress, props.onCopyPress, props.onDeletePress] :
                                [props.onReplyPress, props.onCopyPress, props.onReportPress]}
                        redIndex={props.message?.user != auth.currentUser.uid ? 2 : null}

                    />


                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={props.onCancelPress}
                        style={styles.cancelOption}>
                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>Done</Text>

                    </TouchableOpacity>



                </Animated.View >

            </View>


        </Modal>
    )
}


const styles = StyleSheet.create({

    cancelOption: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#333',
        marginTop: 10,
        borderRadius: 15
    }
})

export default ChatModal