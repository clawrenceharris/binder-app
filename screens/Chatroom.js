import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { assets, Colors } from '../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'

import ChatInput from '../components/ChatInput'

import { auth, db } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { UserProfileCircle } from '../components'
import GroupProfileCircle from '../components/GroupProfileCircle'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import CallButton from '../components/CallButton'
import ChatModal from '../components/ChatModal'
import * as Haptics from 'expo-haptics'




const Chatroom = ({ route }) => {
    const navigation = useNavigation();
    const [chats, setChats] = useState([])
    const [chatroomData, setChatroomData] = useState(null)
    const [ref, setRef] = useState(null)

    const colors = [Colors.light.primary, '#FFF02B', Colors.light.red, '#8BFF5D', '#2E52F5', '#F64083', '#F89E3E']
    const [users, setUsers] = useState([])
    const [showChatModal, setShowChatModal] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null)
    console.log(showChatModal)

    useEffect(() => {

        //get the chatroom data 
        const usersWithColor = []

        const subscriber = db.collection('chatrooms')
            .doc(route.params.chatroomID)
            .onSnapshot(doc => {

                setChatroomData(doc.data())

                const users = doc.data()?.users?.filter(user => user.uid != auth.currentUser.uid)
                let index = 0
                for (let i = 0; i < users?.length; i++) {
                    if (index === colors.length) {
                        index = 0
                    }
                    usersWithColor.push({
                        ...users[i],
                        color: colors[index]

                    })
                    index++
                    setUsers(usersWithColor)
                }

            })


        //chats.sort((a, b) => a?.createdAt > b?.createdAt ? 1 : -1)


        return () => subscriber()


    }, [])


    const onSendPress = (contentType, text) => {
        const chatID = faker.datatype.uuid()

        db.collection('chats')
            .doc(chatID)
            .set({
                id: chatID,
                createdAt: new Date(),
                contentType: contentType,
                text: text,
                user: auth.currentUser.uid,
                reactions: [],

            })
        db
            .collection(`chatrooms`)
            .doc(chatroomData.id)
            .update({

                chats: firebase.firestore.FieldValue.arrayUnion(db.collection('chats').doc(chatID))

            })

        db.collection('chatrooms')
            .doc(chatroomData.id)
            .get()
            .then((doc) => {   // on successful message update
                doc.data().users.forEach(user => { // for each user in the chatroom
                    db
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(chatroomData.id)) //add this chatroom to their database if not already
                        })
                })

            })

    }



    const headerLeft = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton
                navigation={navigation}
                direction='horizontal'
                color='white'
            />
            {chatroomData?.type == 'private' ? <UserProfileCircle size={40} user={chatroomData?.users[0]} showName margin={10} />

                :
                chatroomData?.type == 'group' && <GroupProfileCircle size={40} chatroom={chatroomData} showName margin={10} />}

        </View>
    )




    const onDeletePress = () => {
        setShowChatModal(false)

        const chatID = faker.datatype.uuid()

        db.collection('chats')
            .doc(chatID)
            .set({
                text: "This chat was unsent by the sender 🙈",
                system: true,
                //set timestamp for this systme message is same as the selected message so that the ordering stays the same
                createdAt: selectedChat.createdAt
            })


        //removes the selected chat reference from the chatroom 
        db.collection('chatrooms')
            .doc(chatroomData?.id)
            .update({
                chats: firebase.firestore.FieldValue.arrayRemove(db.collection('chats').doc(selectedChat.id))
            })
        db.collection('chats').doc(selectedChat.id).delete()


        //appends a system chat to inform users that a chat has been unsent
        db.collection('chatrooms')
            .doc(chatroomData?.id)
            .update({
                chats: firebase.firestore.FieldValue.arrayUnion(db.collection('chats').doc(chatID))

            })
    }

    const onReportPress = () => {
        console.log("report pressed")
        setShowChatModal(false)

    }


    const onCopyPress = () => {
        console.log("copy pressed")
        setShowChatModal(false)


    }

    const onReplyPress = () => {
        console.log("Reply pressed")
        setShowChatModal(false)
    }

    const onReactionPress = (reaction) => {
        const reactionObject = { reaction: reaction, userUID: auth.currentUser.uid }
        setShowChatModal(false)
        console.log("You reacted with " + reactionObject.reaction)

        db.collection('chats')
            .doc(selectedChat.id)
            .update({
                reactions: firebase.firestore.FieldValue.arrayUnion(reactionObject)
            })


    }


    return (

        <View style={{ flex: 1, backgroundColor: '#404040' }}>


            <Header
                headerLeft={headerLeft()}
                headerRight={<CallButton />}
                border
            />
            {chatroomData?.type === 'class' && <View style={{ padding: 5, backgroundColor: Colors.light.primary }}>
                {<Text style={{ color: 'white', fontFamily: 'Kanit', textAlign: 'right' }}>Swipe left to see the classroom feed! 👉</Text>}

            </View>}
            <ChatModal
                visible={showChatModal}
                onCancelPress={() => setShowChatModal(false)}
                message={selectedChat}
                users={users}
                onDeletePress={onDeletePress}
                onCopyPress={onCopyPress}
                onReportPress={onReportPress}
                onReplyPress={onReplyPress}
                onReactionPress={onReactionPress}
                startValue={0}

            />

            <ScrollView
                onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
                ref={(ref) => { setRef(ref) }}
                onScrollBeginDrag={() => Keyboard.dismiss()}
            >

                {chats && chats.length ?
                    <Text style={{ text: 'center', fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                        {moment(chats[0]?.createdAt?.toDate()).calendar()}
                    </Text>
                    :
                    <Text style={{ text: 'center', fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                        {'Today'}
                    </Text>
                }

                <FlatList
                    data={chatroomData?.chats}
                    style={{ padding: 10 }}

                    renderItem={({ item }) =>
                        <ChatMessage
                            chat={item}
                            onChatSelected={(chat) => {
                                setShowChatModal(true);
                                setSelectedChat(chat);
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)


                            }}

                            user={users.filter(user => user.uid === item.user)[0]}
                            showTimestamp={true}

                        />
                    }

                    scrollEnabled={false}
                />





            </ScrollView>

            <ChatInput
                onCameraPress={() => { }}
                onSendPress={onSendPress}
                chatroom={chatroomData}
                users={users.filter(user => user.uid != auth.currentUser.uid)} />




        </View >

    )
}






const styles = StyleSheet.create({


    icon: {
        tintColor:
            Colors.light.tint,
        width: 30,
        height: 30

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