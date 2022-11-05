import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const NotificationDrop = (props) => {
  const translateValue = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(
      translateValue,
      {

        toValue: props.toValue,
        duration: 500,
        useNativeDriver: true,

      }).start();[translateValue]
  })


  return (
    //TODO: implement an animated view that slides in from the top and shows a notification/message 
    <View>
      <Text>DropDown</Text>
    </View>
  )
}

export default NotificationDrop