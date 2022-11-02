import { View, Text, TextInput, PanResponder, PanResponderInstance } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated';

export default class ImageText extends React.Component {

    textStyles =


        {
            fontSize: 18,
            color: 'white',
            height: 40,
            width: '100%',
            position: 'absolute',
            top: '50%',
            padding: 10,
            textAlign: 'center'

        }
    state = {

    }

    panResponder: PanResponderInstance | undefined;
    constructor(props) {
        super(props);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                console.log("Press")
            }
        });

    }




    render() {

        return (
            <Animated.View style={[{ position: 'absolute', backgroundColor: '#00000090', width: '100%', height: 40, top: '50%' }]}>
                <View {...this.panResponder?.panHandlers}>

                </View>
                <TextInput style={this.textStyles} />

            </Animated.View>
        )
    }

}



