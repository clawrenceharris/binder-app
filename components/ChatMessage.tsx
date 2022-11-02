import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { Message } from '../types';
import { SHADOWS } from '../constants/Theme';
import NotesMessage from './NotesMessage';
import Notes from '../constants/data/Notes';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PollMessage from './PollMessage';
import Polls from '../constants/data/Polls';
import { Colors } from '../constants/index';
import moment from 'moment';
import UserProfileCircle from './UserProfileCircle';


export type ChatMessageProps = {
    message: Message;




}
const PrivateChatMessage = (props: ChatMessageProps) => {
    const colorScheme = useColorScheme();
    const { message } = props;
    const isMyMessage = () => {
        return message.user.id === 5
    }

    const isNotes = () => {
        return message.contentType === 'notes'
    }

    const isPoll = () => {
        return message.contentType === 'Poll'
    }

    const isBurningQuestion = () => {
        return message.contentType === 'Burning Question'
    }
    const isTextMessage = () => {
        return message.contentType === 'message'
    }



    return (

        <View style={[
            {
                flexDirection: isMyMessage() ? 'column' : 'row',
                marginBottom: 10,
                alignItems: 'center'
            }
        ]}>
            <View style={{ marginRight: 10 }}>
                {!isMyMessage() && <UserProfileCircle user={message.user} showName={false} showStoryBoder={false} size={30} bold={false} showStudyBuddy={false} />}

            </View>


            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                    {isMyMessage() && <Text style={[styles.myName, { color: colorScheme === 'light' ? 'gray' : 'lightgray' }]}>You</Text>}
                    {!isMyMessage() && <Text style={[styles.name, { color: colorScheme === 'light' ? 'gray' : 'lightgray' }]}>{message.user.firstName}</Text>}


                </View>





                <View style={styles.container}>

                    {isTextMessage() && <View style={[
                        styles.messageBox, {
                            backgroundColor: isMyMessage() && isTextMessage() ? '#8C3BD7' : 'white',
                            marginLeft: isMyMessage() ? 90 : 0,
                            marginRight: isMyMessage() ? 0 : 50,
                            shadowColor: colorScheme === 'light' ? 'lightgray' : 'black'

                        }
                    ]}>


                        {isMyMessage() && <Text style={styles.myMessage}>{message.content}</Text>}
                        {!isMyMessage() && <Text style={styles.message}>{message.content}</Text>}


                    </View>}


                </View>







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


        </View>




    )
}
const styles = StyleSheet.create({

    container: {
    },
    messageBox: {

        padding: 7,
        ...SHADOWS.light,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15


    },




    name: {
        color: 'gray',
        fontFamily: 'Kanit',
        marginLeft: 5


    },
    message: {
        margin: 2,
        fontFamily: 'Kanit'

    },

    myMessage: {
        margin: 2,
        textAlign: 'left',
        color: 'white',
        fontFamily: 'Kanit'

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
        fontFamily: 'Kanit'

    },

    myText: {
        fontFamily: 'Kanit'




    },
    // name: {
    //     color: 'gray',
    //     marginBottom: 5
    // },
    myName: {
        marginLeft: '90%',
        fontFamily: 'Kanit',


    },

    profileImage: {
        width: 40,
        height: 40,
        marginLeft: 10

    }


})
export default PrivateChatMessage