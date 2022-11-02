import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { assets, Colors } from '../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import ClassChatRooms from '../constants/data/ClassChatRooms'
import { ImageBackground } from 'react-native'
import ChatInput from '../components/ChatInput'
import useColorScheme from '../hooks/useColorScheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatRooms from '../constants/data/ChatRooms'
import Classes from '../constants/data/Classes'
import { GiftedChat, MessageText } from 'react-native-gifted-chat'
import { auth, db } from '../Firebase/firebase'

const ICON_SIZE = 30;

//route.params = chatRoom, class
const ChatRoom = ({ route }) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const [messages, setMessages] = useState([])


    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        ))
        return unsubscribe
    }, [])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello, from Binder! Please be thoughtful about what you send and follow community guidelines. Happy Binding!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Binder',
                    avatar: ''

                },

            },
        ])


    }, [])


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        db.collection(`chats`).add({
            _id,
            createdAt,
            text,
            user
        })
    }, [])



    return (

        // <ImageBackground source={Colors[colorScheme].chatBackground} style={{ width: '100%', height: '100%' }}>
        //     <FlatList style={{ padding: 10 }}
        //         data={messages}
        //         renderItem={({ item }) => <ChatMessage message={item} />}
        //         keyExtractor={(item) => item._id}
        //     />
        //     <ChatInput Class={Classes[0]} chatRoom={route.params.chatRoom} />


        // </ImageBackground >


        <GiftedChat
            messages={messages}
            onSend={onSend}
            showAvatarForEveryMessage

            user={
                {
                    _id: auth?.currentUser?.uid,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL

                }}
            optionTintColor={Colors.light.primary}
            messagesContainerStyle={{}}
            renderUsernameOnMessage

        />
    )
}






const styles = StyleSheet.create({


    icon: {
        tintColor:
            Colors.light.tint,
        width: ICON_SIZE,
        height: ICON_SIZE

    },
    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'



    },

    className: {
        fontSize: 20,
        fontWeight: '600',

    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    }
})

export default ChatRoom