import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import UserProfileCircle from './UserProfileCircle'
import { SHADOWS } from '../constants/Theme'
import { db } from '../Firebase/firebase'

const ChatListItem = ({ chatroom, isTop, isBottom }) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  //const message = chatroom.messages[chatroom.messages.length - 1]
  const [chatroomData, setChatroomData] = useState(null)
  useEffect(() => {
    const subscriber = db.collection('chatrooms')
      .doc(chatroom.id)
      .onSnapshot((doc) => {
        setChatroomData(doc.data())
      })

    return () => {
      subscriber()
    }
  }, [])

  return (
    <TouchableWithoutFeedback
    // onPress={onPress}
    >
      <View style={{
        backgroundColor: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#5A5959'
      }}>
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
          <View style={{ margin: 10 }}>
            {chatroomData?.type === 'private' && <UserProfileCircle user={chatroomData?.users[0]} story={[]} showStoryBoder={false} size={40} showName bold />}

          </View>
          <View>
            <Text style={[styles.className, { color: 'white' }]}>{chatroomData?.name}</Text>

            {/* <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} /> */}

          </View>

        </View>

      </View>





    </TouchableWithoutFeedback>

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
    marginBottom: 5,
    fontFamily: 'Kanit'



  }
})
export default ChatListItem