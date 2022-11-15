import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import UserProfileCircle from './UserProfileCircle'
import { SHADOWS } from '../constants/Theme'
import { auth, db } from '../Firebase/firebase'
import GroupProfileCircle from './GroupProfileCircle'
import { getDisplayName, getDisplayNameOrYou } from '../utils'

const ChatListItem = ({ chatroom, onPress, onLongPress }) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  //const message = chatroom.messages[chatroom.messages.length - 1]
  const [chatroomData, setChatroomData] = useState(null)
  const [lastUser, setLastUser] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)
  useEffect(() => {
    const subscriber = db.collection('chatrooms')
      .doc(chatroom.id)
      .onSnapshot((doc) => {
        setChatroomData(doc.data())
        setLastMessage(doc.data().messages[doc.data().messages.length - 1])
      })

    if (lastMessage) {
      db.collection('users')
        .doc(lastMessage.user)
        .get()
        .then(doc => setLastUser(doc.data()))
    }



    return () => {
      subscriber()
    }
  }, [lastUser, chatroomData])

  const getOtherUser = () => {
    const user = chatroomData?.users.filter((user) =>
      user.uid !== auth.currentUser.uid)[0]
    return user
  }

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onPress}
      delayLongPress={70}
      onLongPress={() => onLongPress(chatroom)}>

      <View style={{ backgroundColor: 'white', marginBottom: 15, ...SHADOWS.dark, width: '100%', borderRadius: 15, alignItems: 'center', justifyContent: 'center', height: 70 }}>

        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>



          {chatroomData?.type === 'private' ?

            <UserProfileCircle user={chatroomData?.users[0]} story={[]} showStoryBoder={false} size={50} showName={false} bold margin={10} />

            :
            <GroupProfileCircle chatroom={chatroomData} story={[]} showStoryBoder size={50} showName={false} bold margin={10} />


          }




          <View>
            {chatroomData?.type === 'private' ?
              <Text style={[styles.className, { color: 'black', marginLeft: 10 }]}>{getDisplayName(getOtherUser().firstName, getOtherUser().lastName)}</Text>
              :
              <Text style={[styles.className, { color: 'black', fontFamily: 'Kanit', marginLeft: 10 }]}>{chatroomData?.name}</Text>
            }

            {/* <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} /> */}
            {chatroomData?.chats?.length > 0 &&

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {!lastMessage?.system &&
                  <Text style={{ fontFamily: 'Kanit', color: 'gray', marginRight: 2 }}>
                    {getDisplayNameOrYou(lastUser) + ": " + lastMessage?.text}
                  </Text>}



              </View>}

          </View>

        </View>

      </View>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({

  avatar: {
    width: 60,
    height: 60
  },




  messageContent: {
    marginLeft: 10
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: -1,

    shadowRadius: 2,
    shadowColor: '#272727',
    justifyContent: 'center'

  },
  className: {
    fontSize: 18,
    color: Colors.light.tint,
    fontFamily: 'Kanit'



  }
})
export default ChatListItem