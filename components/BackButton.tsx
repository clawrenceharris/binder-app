import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'

const BackButton = (props) => {
    const direction = props.direction ? props.direction : 'horizontal'
    const color = props.color ? props.color : 'white'
    return (
        <TouchableWithoutFeedback onPress={() => { props.onBackPress ? props.onBackPress : props.navigation.goBack() }}>
            {direction === 'horizontal' ?
                <Image
                    source={assets.left_arrow}
                    style={{ width: 24, height: 24, tintColor: color, margin: props.margin }}
                />

                :
                <Image
                    source={assets.down_arrow}
                    style={{ width: 45, height: 45, tintColor: props.color, margin: props.margin }}
                />

            }
        </TouchableWithoutFeedback>
    )
}

export default BackButton