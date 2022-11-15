import { View, Text, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'

const ModalComponent = (props) => {
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const { width, height } = useWindowDimensions();

    const [showModal, setshowModal] = useState(props.visible)


    useEffect(() => {
        toggleModal()

    }, [props.visible])


    const toggleModal = () => {
        if (props.visible) {
            slideIn();
        }
        else {
            setTimeout(() => setshowModal(false), 200)
            slideOut()
        }
    }
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
            visible={showModal}>

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center' }} >


                {props.animated ?
                    <Animated.View
                        style={{ borderColor: 'gray', borderWidth: 1, alignSelf: 'center', height: props.height, backgroundColor: '#333', width: props.width, marginTop: '300%', borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
                        {props.renderContent}
                        {props.showBottomCancelBar &&

                            <TouchableOpacity onPress={toggleModal} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: props.width, height: 40, backgroundColor: 'white', marginTop: 50, borderRadius: 25 }}>
                                <Text style={{ fontFamily: 'KanitMedium', fontSize: 18 }}>{props.cancelText}</Text>
                            </TouchableOpacity>

                        }


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