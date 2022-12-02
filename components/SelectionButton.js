import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
const SelectionButton = (props) => {
    const colorScheme = useColorScheme()


    const styles = StyleSheet.create({
        selectionBtn: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderColor: Colors[colorScheme].tint + "50",
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: props.isSelected ? Colors[colorScheme].primary : 'transparent'
        }
    })
    return (

        <TouchableOpacity
            onPress={props.onSelect}
            activeOpacity={props.activeOpacity}>
            <View style={styles.selectionBtn} />
        </TouchableOpacity>

    )

}

export default SelectionButton

