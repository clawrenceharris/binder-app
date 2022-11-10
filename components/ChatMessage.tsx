import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Message } from '../types';
import NotesMessage from './NotesMessage';
import Notes from '../constants/data/Notes';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PollMessage from './PollMessage';
import Polls from '../constants/data/Polls';
import { Colors } from '../constants/index';
import moment from 'moment';
import UserProfileCircle from './UserProfileCircle';
import { auth, db } from '../Firebase/firebase';
import { getDisplayName } from '../utils';



const ChatMessage = ({ message, previousMessage, user }) => {
    const [userData, setUserData] = useState(null)

    const isMyMessage = () => {
        return message.user === auth.currentUser.uid
    }

    const isSameMessage = () => {
        if (previousMessage)
            return message.user === previousMessage.user
        return false


    }




    const isNotes = () => {
        return message.contentType === 'notes'
    }

    const isPoll = () => {
        return message.contentType === 'poll'
    }

    const isBurningQuestion = () => {
        return message.contentType === 'burning question'
    }
    const isTextMessage = () => {
        return message.contentType === 'text'
    }
    useEffect(() => {

        const subscriber = db.collection('users')
            .doc(message.user)
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


    return (
        <React.Fragment>
            {isMyMessage() &&

                <Text style={styles.name}>You</Text>

            }
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                {!isMyMessage() && <Text style={[styles.name]}>{getDisplayName(userData?.firstName, userData?.lastName)}</Text>}
            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', width: '90%' }}>



                {isTextMessage() && <View style={styles.messageIndicator} />}



                {isMyMessage() && <Text style={styles.text}>{message.text}</Text>}
                {!isMyMessage() && <Text style={styles.text}>{message.text}</Text>}








                {isNotes() && isMyMessage() &&
                    <View style={
                        {
                            marginLeft: isMyMessage() ? 80 : 0,
                            marginRight: isMyMessage() ? 0 : 50,


                        }
                    }>
                        <NotesMessage notes={Notes[0]} />

                    </View>

                }

                {isPoll() && <NotesMessage notes={Notes[0]} />}
                {isBurningQuestion() && <NotesMessage notes={Notes[0]} />}
            </View>


        </React.Fragment>





    )
}

export default ChatMessage