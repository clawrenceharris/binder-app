import { View, Text, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'

const ModalComponent = (props) => {
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current

    const [showModal, setshowModal] = useState(props.visible)





    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: props.position == 'bottom' ? -1 * (props.height * 2) : props.toValue,
                duration: 500,
                useNativeDriver: true,

            }).start();
    }


    function slideOut() {
        Animated.timing(
            translateValue,
            {

                toValue: 900,
                duration: 300,
                useNativeDriver: true,

            }).start();
    }



    return (
        <Modal
            transparent
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}
        >

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center' }} >


                {props.animated ?
                    <Animated.View
                        style={{ borderColor: 'gray', borderWidth: 1, alignSelf: 'center', height: props.height, backgroundColor: Colors[colorScheme].background, width: props.width, marginTop: '300%', borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
                        {props.renderContent}


                    </Animated.View >
                    :
                    <View style={{ height: props.height, backgroundColor: colorScheme === 'light' ? 'white' : '#1E1E1E', width: 250, marginLeft: 70, marginTop: props.marginTop, borderRadius: 25, padding: 20 }}>
                        {props.renderContent}


                    </View >

                }

            </View>


        </Modal>
    )
}

export default ModalComponent