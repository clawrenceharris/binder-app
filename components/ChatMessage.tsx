import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Notes from '../constants/data/Notes';
import { Colors } from '../constants/index';
import moment from 'moment';
import { auth, db } from '../Firebase/firebase';
import { getDisplayName } from '../utils';
import DeskItemPreview from './DeskItemPreview';
import useColorScheme from '../hooks/useColorScheme';
import { SHADOWS, SIZES } from '../constants/Theme';
import { Chat, ChatroomUser } from '../types';


interface Props {
    chat: Chat;
    previousChat: Chat;
    user: ChatroomUser;
    onLongPress: () => void;
    onChatSelected: () => void;
    showsTime: boolean

}


const ChatMessage: FC<Props> = (props) => {
    const [userData, setUserData] = useState(null)
    const [chatData, setChatData] = useState(null)
    const colorScheme = useColorScheme()
    const isEmojiText = (chat) => {
        const emojiRegex = /\p{Emoji}/u;


        for (let i = 0; i < chat.length; i++) {
            if (emojiRegex.test(chat) === false) {
                return false
            }
        }

        return true
    }
    const isMyMessage = () => {
        return props.chat?.user.uid === auth.currentUser.uid
    }

    const isSameMessage = () => {
        if (props.previousChat)
            return props.chat?.user === props.previousChat.user
        return false


    }

    useEffect(() => {




    }, [])



    const isNotes = () => {
        return props.chat.contentType === 'notes'
    }

    const isPoll = () => {
        return props.chat.contentType === 'poll'
    }

    const isBurningQuestion = () => {
        return props.chat.contentType === 'burning question'
    }
    const isTextMessage = () => {
        return props.chat.contentType === 'text'
    }

    useEffect(() => {

        const subscriber = db.collection('users')
            .doc(props.chat.user.uid)
            .onSnapshot(doc => {
                setUserData(doc.data())
            })

        return () => {
            subscriber()
        }
    }, [])

    const getColor = () => {
        if (props.chat.user) {
            return props.user.color
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

        text: {
            fontFamily: 'KanitMedium',
            marginLeft: 10,
            color: Colors[colorScheme].tint,
            fontSize: 16
        },

        middleContainer: {
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'lightgray',
            ...SHADOWS[colorScheme],
            borderRadius: 10
        }
    })

    return (
        <View>

            {!props.chat.isSystem ?

                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={() => onChatSelected(chat)}
                    delayLongPress={100}>

                    <React.Fragment>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {isMyMessage() ?
                                <Text style={styles.name}>{'You'}</Text>

                                :

                                <Text style={[styles.name]}>{userData?.displayName}</Text>}


                            {props.showsTime && <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 12 }}>{moment(props.chat.createdAt).format('LT')}</Text>}


                        </View>



                        <View
                            style={[styles.middleContainer]}>



                            <View style={styles.messageIndicator} />


                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                {isEmojiText(chat?.text) ? <Text style={[styles.text, { fontSize: 48 }]}>{chat?.text}</Text> : <Text style={styles.text}>{chat?.text}</Text>


                                }





                            </View>


                            {isNotes() && isMyMessage() &&
                                <View style={
                                    {
                                        marginLeft: isMyMessage() ? 80 : 0,
                                        marginRight: isMyMessage() ? 0 : 50,


                                    }
                                }>
                                    <DeskItemPreview
                                        item={Notes[0]}
                                        onLongPress={undefined}
                                        margin={undefined}
                                        onMorePress={undefined}
                                        deskCategory={undefined}
                                        showBookmarked={undefined} />

                                </View>

                            }

                            {isPoll() && <DeskItemPreview item={Notes[0]} onLongPress={undefined} margin={undefined} onMorePress={undefined} deskCategory={undefined} showBookmarked={undefined} />}
                            {isBurningQuestion() && <DeskItemPreview item={Notes[0]} onLongPress={undefined} margin={undefined} onMorePress={undefined} deskCategory={undefined} showBookmarked={undefined} />}
                        </View >



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