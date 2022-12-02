import { View, Text, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'


/*Renders a styled button 
@param condition: boolean to control whether the button should be touchable
@param onPress: Function that will be called when the button is pressed
@param title: The title of the button
@param backgroud: The background color of the button- defaults to primary color
@param tint: the text color of the button - defualts to white
*/

interface Props {
    onPress: () => void;
    titleStyle?: TextStyle;
    title: string;
    icon?: JSX.Element;
    disabled?: boolean;
    style?: ViewStyle;
    background?: string;
    tint?: string


}
const Button: FC<Props> = (props) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 50,
            width: '100%',
            backgroundColor: !props.disabled ? props.background || Colors.light.primary : '#00000020',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 60,
            alignSelf: 'center'
        },
        title: {
            color: !props.disabled ? props.tint || 'white' : '#00000030',
            fontFamily: "KanitBold",
            fontSize: 20
        }
    })
    return (
        <TouchableOpacity

            onPress={!props.disabled ? props.onPress : () => { }}
            activeOpacity={!props.disabled ? 0.7 : 1}
            style={[styles.buttonContainer, { ...props.style }]}>
            {!props.icon ? <Text {...props.titleStyle} style={styles.title}>{props.title}</Text> : props.icon}

        </TouchableOpacity>
    )


}

export default Button