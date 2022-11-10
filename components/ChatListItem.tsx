import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import UserProfileCircle from './UserProfileCircle'
import { SHADOWS } from '../constants/Theme'
import { auth, db } from '../Firebase/firebase'
import GroupProfileCircle from './GroupProfileCircle'
import { getDisplayName } from '../utils'

const ChatListItem = ({ chatroom, onPress, onLongPress }) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  //const message = chatroom.messages[chatroom.messages.length - 1]
  const [chatroomData, setChatroomData] = useState(null)
  const [lastUser, setLastUser] = useState(null)
  useEffect(() => {
    const subscriber = db.collection('chatrooms')
      .doc(chatroom.id)
      .onSnapshot((doc) => {
        setChatroomData(doc.data())

      })

    db.collection('users')
      .doc(chatroomData?.messages[chatroomData?.messages?.length - 1]?.user)
      .get()
      .then(doc => setLastUser(doc.data()))


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
      onLongPress={() => onLongPress(chatroom)}>

      <View style={{ marginLeft: 30, marginBottom: 10, padding: 0, ...SHADOWS.dark, width: '90%', borderRadius: 15, backgroundColor: '#5B5B5B', alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
          <View style={{ margin: 10 }}>
            {chatroomData?.type === 'private' ?

              <UserProfileCircle user={chatroomData?.users[0]} story={[]} showStoryBoder={false} size={40} showName={false} bold />

              :
              <View style={{ position: 'absolute', left: -40, bottom: -30, borderRadius: 100, backgroundColor: '#333', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                <GroupProfileCircle chatroom={chatroomData} story={[]} showStoryBoder={false} size={50} showName={false} bold />

              </View>

            }

          </View>
          <View>
            {chatroomData?.type === 'private' ?
              <Text style={[styles.className, { color: 'white', marginLeft: 25 }]}>{getDisplayName(getOtherUser().firstName, getOtherUser().lastName)}</Text>
              :
              <Text style={[styles.className, { color: 'white', fontFamily: 'KanitBold', marginLeft: 25 }]}>{chatroomData?.name}</Text>
            }

            {/* <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} /> */}
            {chatroomData?.messages?.length > 0 &&
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>

                <Text style={{ fontFamily: 'KanitMedium', color: 'lightgray', marginRight: 2 }}>
                  {chatroomData?.messages[chatroomData?.messages?.length - 1]?.user !== auth.currentUser.uid ?
                    getDisplayName(lastUser?.firstName, lastUser?.lastName)
                    :
                    'You'}:
                </Text>
                <Text style={{ fontFamily: 'Kanit', color: '#939292' }}>{chatroomData?.messages[chatroomData?.messages?.length - 1]?.text}</Text>
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