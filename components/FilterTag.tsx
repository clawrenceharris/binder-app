import { View, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import React, { useEffect, useState, FC } from 'react'
import { db } from '../Firebase/firebase'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'



interface Props {

    onPress: () => void;
    isSelected: boolean;
    key: string;
    style?: ViewStyle;
    data: string;

}
const FilterTag: FC<Props> = (props) => {
    const colorScheme = useColorScheme()



    return (
        <TouchableWithoutFeedback
            key={props.key}
            onPress={() => { props.onPress(); }}>
            <View style={[{
                padding: 10,
                borderColor: props.isSelected ? Colors.primary : 'lightgray',
                borderWidth: 1,
                height: 40,
                marginRight: 10,
                borderRadius: 50,
                backgroundColor: props.isSelected ? Colors.primary : 'transparent'
            }, {
                ...props.style
            }]}>
                <Text style={{ fontFamily: 'Kanit', color: props.isSelected ? 'white' : Colors[colorScheme].tint }}>{props.data}</Text>

            </View>
        </TouchableWithoutFeedback>

    )
}

export default FilterTag