import { View, Text, Animated } from 'react-native'
import React, { useEffect } from 'react'

const NotificationDrop = (props) => {
  const colorScheme = useColorScheme()
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
    <View>
      <Text>DropDown</Text>
    </View>
  )
}

export default NotificationDrop