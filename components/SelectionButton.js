import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants'
export default class SelectionButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const styles = StyleSheet.create({
            selectionBtn: {
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
                borderColor: 'lightgray',
                borderWidth: 1,
                borderRadius: 100,
                backgroundColor: this.props.isSelected ? Colors.light.primary : 'transparent'
            }
        })
        return (

            <TouchableOpacity
                onPress={this.props.onSelect}
                activeOpacity={this.props.activeOpacity}>
                <View style={styles.selectionBtn} />
            </TouchableOpacity>

        )
    }
}

