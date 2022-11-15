import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Notes from '../constants/data/Notes';
import { Colors } from '../constants/index';
import moment from 'moment';
import { auth, db } from '../Firebase/firebase';
import { getDisplayName } from '../utils';
import DeskItemPreview from './DeskItemPreview';



const ChatMessage = ({ chat, previousMessage, user, showTimestamp, onLongPress, onChatSelected }) => {
    const [userData, setUserData] = useState(null)
    const [chatData, setChatData] = useState(null)
    console.log()
    const isMyMessage = () => {
        return chatData?.user === auth.currentUser.uid
    }

    const isSameMessage = () => {
        if (previousMessage)
            return chatData?.user === previousMessage.user
        return false


    }

    useEffect(() => {
        const subscriber = db.collection('chats')
            .doc(chat.id)
            .onSnapshot(doc => {
                setChatData(doc.data())
            })

        return () => subscriber()


    }, [])



    const isNotes = () => {
        return chatData?.contentType === 'notes'
    }

    const isPoll = () => {
        return chatData?.contentType === 'poll'
    }

    const isBurningQuestion = () => {
        return chatData?.contentType === 'burning question'
    }
    const isTextMessage = () => {
        return chatData?.contentType === 'text'
    }
    useEffect(() => {

        const subscriber = db.collection('users')
            .doc(chatData?.user)
            .onSnapshot(doc => {
                setUserData(doc.data())
            })

        return () => {
            subscriber()
        }
    }, [])

    const getColor = () => {
        if (user) {
            return user.color
        }
        else {
            return 'white'
        }
    }
    const styles = StyleSheet.create({

        messageIndicator: {
            borderRadius: 25,
            width: 10,
            height: '100%',
            backgroundColor: isMyMessage() ? Colors.light.accent : getColor()
        },

        name: {
            color: 'gray',
            fontFamily: 'Kanit',
            marginBottom: 5
        },

        time: {
            alignSelf: "flex-end",
            color: 'grey'
        },

        mainContainer: {
            flexDirection: 'row',
            alignItems: 'center'

        },

        midContainer: {
            marginLeft: 10
        },

        text: {
            fontFamily: 'KanitMedium',
            marginLeft: 10,
            color: 'white',
            fontSize: 16
        },

        profileImage: {
            width: 40,
            height: 40,
            marginLeft: 10
        }


    })


    const getReactions = () => {
        if (chatData?.reactions?.length > 0) {
            return chatData?.reactions[0].reaction
        }
        return ' '
    }

    return (
        <View>

            {!chatData?.system ?

                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={() => onChatSelected(chatData)}
                    delayLongPress={100}>

                    <React.Fragment>

                        {isMyMessage() ?
                            <Text style={styles.name}>You</Text>

                            :

                            <Text style={[styles.name]}>{getDisplayName(userData?.firstName, userData?.lastName)}</Text>}




                        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', width: '90%' }}>



                            {isTextMessage() && <View style={styles.messageIndicator} />}


                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                {isMyMessage() && <Text style={styles.text}>{chatData?.text}</Text>}
                                {!isMyMessage() && <Text style={styles.text}>{chatData?.text}</Text>}





                                {showTimestamp && <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 12, marginRight: -20 }}>{moment(chatData?.createdAt.toDate()).format('LT')}</Text>}
                            </View>








                            {isNotes() && isMyMessage() &&
                                <View style={
                                    {
                                        marginLeft: isMyMessage() ? 80 : 0,
                                        marginRight: isMyMessage() ? 0 : 50,


                                    }
                                }>
                                    <DeskItemPreview item={Notes[0]} />

                                </View>

                            }

                            {isPoll() && <DeskItemPreview item={Notes[0]} />}
                            {isBurningQuestion() && <DeskItemPreview item={Notes[0]} />}
                        </View>
                        {chatData?.reactions?.length > 0 && <View style={{ flexDirection: 'row', borderRadius: 25, paddingHorizontal: 5, marginTop: -10 }}>

                            {chatData?.reactions.map((item, index) =>
                                <View key={index.toString()} style={{ backgroundColor: 'gray', borderColor: '#404040', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 3, marginLeft: -10 }}>
                                    <Text style={{ fontSize: 12 }}>{item.reaction}</Text>
                                </View>

                            )}
                        </View>}

                    </React.Fragment>
                </TouchableOpacity>

                :
                <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center' }}>{chatData?.text}</Text>

                </View>
            }

        </View>




    )
}

export default ChatMessage