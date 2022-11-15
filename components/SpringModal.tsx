import { View, Text, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'

const SpringModal = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible)
    const scaleValue = useRef(new Animated.Value(0)).current
    const toggleModal = () => {
        if (visible) {
            setShowModal(true)
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        } else {
            setTimeout(() => setShowModal(false), 200)
            Animated.timing(scaleValue, {
                toValue: 300,
                duration: 200,
                useNativeDriver: true
            })
        }
    }
    useEffect(() => {
        toggleModal();


    }, [visible])


    return (
        <Modal
            visible={showModal}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            {children}

        </Modal>
    )
}

export default SpringModal