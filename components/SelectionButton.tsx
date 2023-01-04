import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'

interface Props {
    isSelected: boolean;
    activeOpacity?: number;
    color?: string;
    onSelect: () => void;
    style?: ViewStyle;
}

const SelectionButton: FC<Props> = (props) => {
    const colorScheme = useColorScheme()


    const styles = StyleSheet.create({
        selectionBtn: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 20,
            height: 20,
            borderColor: props.isSelected ? 'white' : Colors[colorScheme].gray,
            borderWidth: props.isSelected && 2,
            borderRadius: 100,
            backgroundColor: props.isSelected ? props.color || Colors.accent : 'transparent'
        },
        selectionBtnContainer: {
            backgroundColor: props.isSelected ? props.color || Colors.accent : 'transparent',
            borderWidth: 1,
            borderColor: props.isSelected ? 'white' : Colors[colorScheme].gray,
            borderRadius: 50,
            padding: 5
        }
    })
    return (

        <TouchableOpacity
            onPress={props.onSelect}
            style={[styles.selectionBtnContainer, { ...props.style }]}
            activeOpacity={props.activeOpacity}>
            <View style={styles.selectionBtn} />
        </TouchableOpacity>

    )

}

export default SelectionButton

