import { View, Text, Image } from 'react-native'
import React from 'react'
import { Notes, Poll } from '../types';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/index.ts';



export type PollProps = {
    poll: Poll;



}
const PollMessage = (props: PollProps) => {
    const { poll } = props;

    return (
        <View>
            <Text>{poll.title}</Text>




        </View>


    )
}

export default PollMessage