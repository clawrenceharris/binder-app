import { View, Text, StyleSheet, FlatList, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { assets, Colors } from '../constants'
import Chat from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import { auth, db } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { ProfileButton } from '../components'
import moment from 'moment'
import CallButton from '../components/CallButton'
import ChatModal from '../components/ChatModal'
import { getDisplayNameOrYou } from '../utils'
import useColorScheme from '../hooks/useColorScheme'
import { ActivityBadge } from '../components/ProfileBadges'
import { useNavigation } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'





const Chatroom = ({ route }) => {
    const [message, setMessage] = useState("")
    const navigation = useNavigation()
    const [chats, setChats] = useState([])
    const [chatroomData, setChatroomData] = useState(null)
    const [ref, setRef] = useState(null)
    const { id, name } = route.params
    const colors = [
        Colors.accent,
        Colors.yellow,
        Colors.red,
        Colors.blue,
        Colors.red,
        Colors.green,
        Colors.pink,
        Colors.orange
    ]
    const [users, setUsers] = useState([])
    const [showChatModal, setShowChatModal] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null)
    const [showTimestamp, setShowTimestamp] = useState(false)
    const [deskItem, setDeskItem] = useState(null)
    const colorScheme = useColorScheme()
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    useLayoutEffect(() => {

        const subscriber = db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .orderBy("createdAt", "asc")
            .onSnapshot(snapshot => {
                setChats(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        return subscriber
    }, [route])

    useEffect(() => {

        // set the chatroom data
        db.collection('chatrooms')
            .doc(id)
            .get()
            .then(doc => {
                setChatroomData(doc.data())



            })



    }, [])


    const onSendPress = (contentType, text) => {

        //add the chat object to this chatroom
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .add({

                createdAt: new Date(),
                contentType: contentType,
                text: text,
                deskItem: null,
                user: db.collection('users').doc(auth.currentUser.uid),
                reactions: [],
                isSystem: false
            })



    }
    const onDeskItemSendPress = (contentType, deskItem, text) => {
        //add the chat object to this chatroom
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .add({
                createdAt: new Date(),
                contentType: contentType,
                text: text,
                deskItem: deskItem,
                user: db.collection('users').doc(auth.currentUser.uid),
                reactions: [],
                isSystem: false

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
                    navigation.navigate('Profile', { user: chatroomData?.users[0] })
                }}
                badgeContainerStyle={{ backgroundColor: chatroomData?.type === 'private' && Colors.primary, top: chatroomData?.type === 'private' && '55%', left: chatroomData?.type === 'private' && '65%' }}
                badge={chatroomData?.type === 'private' && ActivityBadge()}
                name={name}
                showsName
                containerStyle={{ marginLeft: 5 }}


            />



        </View>
    )




    const onDeletePress = () => {
        console.log("delete pressed")
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
        console.log('reaction: ' + reaction)
        db.collection('chatrooms')
            .doc(id)
            .collection('chats')
            .doc(selectedChat.id)
            .update({
                reactions: firebase.firestore.FieldValue.arrayUnion({
                    reaction: reaction,
                    user: {
                        uid: auth.currentUser.uid,
                        displayName: auth.currentUser.displayName,
                        photoURL: auth.currentUser.photoURL
                    }
                })
            })
    }


    return (

        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
            <Header

                style={{ backgroundColor: Colors.primary, height: 170, zIndex: -2 }}
                headerLeft={headerLeft()}
                headerRight={<CallButton />}
                border
            />
            {/* {chatroomData?.type === 'class' &&

                <View style={{ padding: 5, backgroundColor: Colors.accent, borderTopWidth: 2, borderColor: 'white' }}>
                    <Text style={{ color: 'white', fontFamily: 'Kanit', textAlign: 'right' }}>
                        {"Swipe left to see the classroom feed! 👉"}
                    </Text>

                </View>} */}

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

            <View style={{ flex: 1, marginTop: -30, borderRadius: 15, backgroundColor: Colors[colorScheme].background, zIndex: -1, overflow: 'hidden' }}>
                <ScrollView
                    style={{ marginHorizontal: 10 }}
                    onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
                    ref={setRef}
                    onScrollBeginDrag={() => {
                        //Keyboard.dismiss();
                        setShowTimestamp(true)

                    }}
                    keyboardDismissMode='interactive'

                    onScrollEndDrag={() => setTimeout(() => setShowTimestamp(false), 2000)}>

                    {chats?.length ?
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {moment(chats[0]?.data?.createdAt?.toDate()).calendar()}
                        </Text>
                        :
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', margin: 20 }}>
                            {'Today'}
                        </Text>}


                    {chats.map(({ id, data }, index) => (

                        <View key={id} style={{ marginBottom: index === chats.length - 1 ? 30 : 0 }}>
                            <ChatMessage
                                chat={data}
                                onDeskItemPress={() => navigation.navigate("DeskItem", { deskItem: data.deskItem, deskType: data.contentType })}
                                onLongPress={() => { setSelectedChat(data); setShowChatModal(true) }}
                                previousChat={chats[index - 1]}
                                showsTime={showTimestamp}
                                index={index}

                            />
                        </View>
                    ))}



                </ScrollView>

            </View>




            <ChatInput
                onCameraPress={() => { }}
                onSendPress={onSendPress}
                message={message}
                deskItem={deskItem}
                onChangeMessage={setMessage}
                onDeskPress={() => navigation.navigate('SelectDeskItem', { onSelect: onDeskItemSendPress })}

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