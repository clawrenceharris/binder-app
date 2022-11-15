import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants'


/*Renders a styled button 
@param condition: boolean to control whether the button should be touchable
@param onPress: Function that will be called when the button is pressed
@param title: The title of the button
@param backgroud: The background color of the button- defaults to primary color
@param tint: the text color of the button - defualts to white
*/
export default class Button extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const styles = StyleSheet.create({
            btn: {
                borderRadius: 50,
                width: this.props.width ? this.props.width : null,
                backgroundColor: this.props.condition ? this.props.background : 'gray',
                paddingHorizontal: 40,
                alignItems: 'center',
                justifyContent: 'center',
                margin: this.props.margin,
                minHeight: 60,
                alignSelf: 'center'
            },
            btnText: {
                color: this.props.tint,
                fontFamily: "KanitMedium",
                fontSize: 18
            }



        })
        return (
            <TouchableOpacity
                onPress={this.props.condition ? this.props.onPress : () => { }}
                activeOpacity={this.props.condition ? this.props.activeOpacity : 1}
                style={styles.btn}>
                {!this.props.icon ? <Text style={styles.btnText}>{this.props.title}</Text> : this.props.icon}
            </TouchableOpacity>
        )
    }

}