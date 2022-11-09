import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { assets, Colors } from '../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import { ImageBackground } from 'react-native'
import ChatInput from '../components/ChatInput'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { UserProfileCircle } from '../components'
import GroupProfileCircle from '../components/GroupProfileCircle'
import { faker } from '@faker-js/faker'
const ICON_SIZE = 30;

//route.params = chatRoom, class
const Chatroom = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
    const [chatroomData, setChatroomData] = useState(null)
    const [ref, setRef] = useState(null)
    const route = useRoute()
    //  useLayoutEffect(() => {
    //     const unsubscribe = db

    //     .collection('chats') 
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(snapshot => 

    //         setMessages(
    //         snapshot.docs.map(doc => ({
    //             id: doc.data().id,
    //             createdAt: doc.data().createdAt.toDate(),
    //             text: doc.data().text,
    //             user: doc.data().user
    //         }))
    //     ))
    //     return unsubscribe
    // }, [])

    useEffect(() => {
        //get the chatroom data 
        const subscriber = db.collection('chatrooms')

            .doc(route.params.chatroom)
            .onSnapshot(doc => {
                setChatroomData(doc.data())
                setMessages(chatroomData?.messages)
            })



        return () => subscriber()


    }, [messages])


    const onSendPress = (contentType, text) => {

        db
            .collection(`chatrooms`)
            .doc(chatroomData.id)
            .update({

                messages: firebase.firestore.FieldValue.arrayUnion({
                    id: faker.datatype.uuid(),
                    createdAt: new Date(),
                    contentType: contentType,
                    text: text,
                    user: auth.currentUser.uid,
                    reactions: []
                })

            })
    }

    const headerLeft = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton
                direction='horizontal'
                color='white'
            />
            {chatroomData?.type == 'private' ? <UserProfileCircle size={40} user={chatroomData?.users[0]} showName margin={5} />

                :
                chatroomData?.type == 'group' && <UserProfileCircle size={40} user={chatroomData?.users[0]} showName margin={5} />}

        </View>
    )

    const headerRight = () => (
        <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />
        </TouchableOpacity>

    )
    return (

        <View style={{ flex: 1, backgroundColor: '#404040' }}>
            <Header
                headerLeft={headerLeft()}
                headerRight={headerRight()}
            />
            <ScrollView
                centerContent
                style={{ padding: 10 }}
                onContentSizeChange={() => ref.scrollToEnd({ animated: false })}
                ref={(ref) => { setRef(ref) }}
            >

                {messages?.map((item, index) =>
                    <View key={item.id}>
                        <ChatMessage message={item} previousMessage={index - 1 > 0 ? messages[index - 1] : null} />

                    </View>

                )}
            </ScrollView>

            <ChatInput onCameraPress={() => { }} onSendPress={onSendPress} />


        </View >

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

export default Chatroom