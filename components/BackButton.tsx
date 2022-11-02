import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'

const BackButton = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => { props.navigation.goBack() }}>
            {props.direction === 'horizontal' ?
                <Image
                    source={assets.left_arrow}
                    style={{ width: 24, height: 24, tintColor: props.color, margin: props.margin }}
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