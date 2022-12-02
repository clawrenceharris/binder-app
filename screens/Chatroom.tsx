import { View, Text, StyleSheet, FlatList, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../constants'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import { auth, db, updateCollection } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { ProfileButton } from '../components'
import { faker } from '@faker-js/faker'
import moment from 'moment'
import CallButton from '../components/CallButton'
import ChatModal from '../components/ChatModal'
import { getDisplayNameOrYou, haptics } from '../utils'
import useColorScheme from '../hooks/useColorScheme'
import { ActivityBadge } from '../components/ProfileBadges'





const Chatroom = ({ route }) => {
    const [message, setMessage] = useState('')
    const navigation = useNavigation();
    const [chats, setChats] = useState([])
    const [chatroomData, setChatroomData] = useState(null)
    const [ref, setRef] = useState(null)
    const { chatroomID } = route.params
    const colors = [
        Colors.light.primary,
        '#FFF02B',
        Colors.light.red,
        '#8BFF5D',
        '#2E52F5',
        '#F64083',
        '#F89E3E',
        '#7FF449'
    ]
    const [users, setUsers] = useState([])
    const [showChatModal, setShowChatModal] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null)
    const [showTimestamp, setShowTimestamp] = useState(false)
    const colorScheme = useColorScheme()

    useEffect(() => {


        const usersWithColor = []
        const usersData = []

        const subscriber = db.collection('chatrooms')
            .doc(chatroomID)
            .onSnapshot(doc => {

                setChatroomData(doc.data())

                const users = doc.data()?.users

                users?.forEach(user => {

                    db.collection('users')
                        .doc(user.id)
                        .get()
                        .then(doc => {
                            usersData.push(doc.data())
                            setUsers(usersData)

                        })
                })

                let index = 0
                for (let i = 0; i < users?.length; i++) {
                    if (index === colors.length) {
                        index = 0
                    }
                    usersWithColor.push({
                        user: usersData[i],
                        color: colors[index]

                    })
                    index++
                    setUsers(usersWithColor)
                }


            })

        //sort the chats by time they were sent    
        //chats.sort((a, b) => a?.createdAt > b?.createdAt ? 1 : -1)


        return () => subscriber()


    }, [])


    const onSendPress = (contentType, text) => {
        const chatID = faker.datatype.uuid()
        //add the chat object to this chatroom
        db.collection('chatrooms')
            .doc(chatroomID)
            .update({

                chats: firebase.firestore.FieldValue.arrayUnion({
                    id: chatID,
                    createdAt: new Date(),
                    contentType: contentType,
                    text: text,
                    user: auth.currentUser.uid,
                    reactions: [],
                })
            })
        db.collection('chatrooms')
            .doc(chatroomID)
            .get()
            .then((doc) => {   // on successful message update
                doc.data().users.forEach(user => { // for each user in the chatroom
                    updateCollection(
                        'users',
                        user,
                        {
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(chatroomData.id))
                        })

                })

            })
    }
    const getDefaultImage = () => {
        switch (chatroomData?.type) {
            case 'private': return assets.person
            case 'group': return assets.group
            case 'class': return assets.book
            case 'school': return assets.school


        }
    }

    const headerLeft = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton
                navigation={navigation}
                direction='horizontal'
                color='white'
            />


            <ProfileButton
                defaultImage={getDefaultImage()}
                onPress={function (): void {
                    navigation.navigate('Profile')
                }}
                badgeContainerStyle={{ backgroundColor: chatroomData?.type === 'private' && Colors.light.accent, top: chatroomData?.type === 'private' && '55%', left: chatroomData?.type === 'private' && '65%' }}
                badge={chatroomData?.type === 'private' && ActivityBadge()}
                name={chatroomData?.name}
                showsName


            />



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

        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
            <Header

                style={{ backgroundColor: Colors.light.accent, height: 200, zIndex: -2 }}
                headerLeft={headerLeft()}
                headerRight={<CallButton />}
                border
            />
            {chatroomData?.type === 'class' &&

                <View style={{ padding: 5, backgroundColor: Colors.light.primary, borderTopWidth: 2, borderColor: 'white' }}>
                    <Text style={{ color: 'white', fontFamily: 'Kanit', textAlign: 'right' }}>
                        {"Swipe left to see the classroom feed! 👉"}
                    </Text>

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

            <View style={{ flex: 1, marginTop: -30, borderRadius: 25, backgroundColor: Colors[colorScheme].background, zIndex: -1, overflow: 'hidden' }}>
                <ScrollView
                    style={{ marginTop: 20 }}
                    onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
                    ref={setRef}
                    onScrollBeginDrag={() => {
                        Keyboard.dismiss();
                        setShowTimestamp(true)

                    }}

                    onScrollEndDrag={() => setTimeout(() => setShowTimestamp(false), 2000)}>

                    {chats && chats.length ?
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {moment(chats[0]?.createdAt?.toDate()).calendar()}
                        </Text>
                        :
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {'Today'}
                        </Text>}

                    <FlatList
                        data={chatroomData?.chats}
                        style={{ padding: 10 }}

                        renderItem={({ item }) =>
                            <ChatMessage
                                chat={item}
                                onChatSelected={(chat) => {
                                    setShowChatModal(true)
                                    setSelectedChat(chat)
                                    haptics('light')
                                }}

                                chatroom={chatroomData}
                                user={users.filter(user => user?.user === item?.user)[0]}
                                showTimestamp={showTimestamp}
                                previousMessage={chatroomData?.chats[chatroomData?.chats.length - 2]}
                                onLongPress={() => { }}
                            />}

                        scrollEnabled={false}
                    />

                </ScrollView>

            </View>
            <ScrollView

                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row', marginBottom: 5, backgroundColor: 'transparent', padding: 5, position: 'absolute', bottom: 100, width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Text>{"@ someone!"}</Text>
                {chatroomData?.type != 'private' &&

                    users?.map((item, index) => {

                        return (
                            <TouchableOpacity onPress={() => setMessage(message + ' @' + item.displayName)} >
                                <View style={{ paddingVertical: 2, paddingHorizontal: 10, borderRadius: 50, borderColor: item?.uid === auth.currentUser.uid ? Colors.light.accent : item?.color, marginLeft: 10, borderWidth: 2, alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].gray, fontSize: 12 }}>{getDisplayNameOrYou(item)}</Text>
                                </View>
                            </TouchableOpacity>

                        )
                    }
                    )}



            </ScrollView>

            <ChatInput
                onCameraPress={() => { }}
                onSendPress={onSendPress}
                chatroom={chatroomData}
                message={message}
                onChangeMessage={setMessage}
            />

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