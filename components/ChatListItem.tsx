import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import UserProfileCircle from './UserProfileCircle'

const ChatListItem = ({ chatRoom, size }) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const message = chatRoom.messages[chatRoom.messages.length - 1]

  return (
    <View style={[styles.chatContainer, { borderBottomColor: Colors[colorScheme].gray }]} >
      <UserProfileCircle user={message.user} showStudyBuddy showStoryBoder={true} size={40} showName bold />
      <View>
        <Text style={[styles.name, { color: Colors[colorScheme].tint, fontSize: size + 10 }]}>{message.user.firstName} </Text>
        <Text style={[styles.messageContent, { color: Colors[colorScheme].tint }]}>Sent {message.contentType}</Text>
      </View>

    </View >

  )
}
const styles = StyleSheet.create({

  avatar: {
    width: 60,
    height: 60
  },

  chatContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',


  },

  name: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,


  },

  messageContent: {
    marginLeft: 10
  }
})
export default ChatListItem