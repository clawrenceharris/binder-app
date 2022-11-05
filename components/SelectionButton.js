import { View, Text, Animated, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, assets } from '../constants'
export default class SelectionButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (

            <TouchableOpacity
                onPress={this.props.onSelect}
                activeOpacity={this.props.activeOpacity}
            >

                <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, borderColor: 'lightgray', borderWidth: 1, borderRadius: 100, backgroundColor: this.props.isSelected ? Colors.light.primary : '#272727' }} />
            </TouchableOpacity>

        )
    }
}

