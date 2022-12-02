import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ProfileButton from './ProfileButton'
import { SHADOWS } from '../constants/Theme'
import { auth, db, getData } from '../Firebase/firebase'
import GroupProfileCircle from './ProfileButton'
import { getDisplayNameOrYou } from '../utils'

const ChatListItem = ({ chatroom, onPress, onLongPress }) => {
  //const message = chatroom.messages[chatroom.messages.length - 1]
  const [chatroomData, setChatroomData] = useState(null)
  const [lastUser, setLastUser] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)
  const colorScheme = useColorScheme()

  useEffect(() => {
    const subscriber = db.collection('chatrooms')
      .doc(chatroom.id)
      .onSnapshot((doc) => {
        setChatroomData(doc.data())

        setLastMessage(doc.data()?.chats[doc.data()?.chats?.length - 1])
        getData('users', lastMessage?.user, setLastUser)


      })






    return () => {
      subscriber()
    }
  }, [lastUser])


  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onPress}
      delayLongPress={3000}
      onLongPress={() => onLongPress(chatroomData)}>

      <View style={{ backgroundColor: 'white', marginBottom: 15, ...SHADOWS[colorScheme], width: '100%', borderRadius: 15, alignItems: 'center', justifyContent: 'center', height: 70 }}>

        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>



          {chatroomData?.type === 'private' ?

            <ProfileButton />

            :
            <ProfileButton />


          }

          <View>

            <Text style={[styles.className, { color: 'black', fontFamily: 'Kanit', marginLeft: 10 }]}>{chatroomData?.name}</Text>


            {/* <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} /> */}
            {chatroomData?.chats?.length > 0 &&

              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {!lastMessage?.system &&
                  <Text style={{ fontFamily: 'Kanit', color: 'gray', marginRight: 2 }}>
                    {lastUser && getDisplayNameOrYou(lastUser) + ": " + lastMessage?.text}
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