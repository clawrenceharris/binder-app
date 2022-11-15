import { View, Text, TextInput, TouchableOpacity, Animated, Modal, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import { Colors } from '../constants';
import Button from './Button';

const ConfirmationModal = ({ message, title = 'Are You Sure?', cancelText = "Cancel", confirmText = "I'm Sure 👍", onCancelPress, onConfirmPress, showModal }) => {
    const { width, height } = useWindowDimensions()

    const translateValue = useRef(new Animated.Value(0)).current

    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: -700,
                duration: 300,
                useNativeDriver: true,

            }).start();
    }




    function slideOut() {
        Animated.timing(
            translateValue,
            {

                toValue: 900,
                duration: 500,
                useNativeDriver: true,

            }).start();
    }


    return (
        <Modal
            transparent
            visible={showModal}
            onShow={slideIn}
            onDismiss={slideOut}
        >

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center' }} >


                <Animated.View style={{ borderColor: 'gray', borderWidth: 1, alignSelf: 'center', height: 280, backgroundColor: '#333', width: 300, marginTop: height, borderRadius: 25, padding: 20, transform: [{ translateY: translateValue }], }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', paddingBottom: 5 }}>
                            <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Kanit' }}>{title}</Text>

                        </View>

                        <Text style={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center', marginVertical: 20 }}>{message}</Text>




                        <Button
                            title={confirmText}
                            background={Colors.light.accent}
                            tint={'white'}
                            condition={true}
                            onPress={onConfirmPress}




                        />

                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: -40 }}
                            onPress={onCancelPress}>
                            <Text style={{ color: 'white', fontFamily: "KanitBold", marginTop: 5, fontSize: 16 }}>{cancelText}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal >

    )
}

export default ConfirmationModal