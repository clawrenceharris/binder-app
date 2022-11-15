import { View, Text, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, StyleSheet, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import PollOptions from '../constants/data/PollOptions'
import OptionsList from './OptionsList'
import ToggleButton from './ToggleButton'
import SelectionButton from './SelectionButton'

const ClassOptionsModal = (props) => {
    const colorScheme = useColorScheme()
    const translateValue = useRef(new Animated.Value(0)).current
    const modalHeight = 150
    const { width, height } = useWindowDimensions();
    const [isSelected, setIsSelected] = useState(false)

    const padding = 40

    function slideIn() {
        Animated.timing(
            translateValue,
            {

                toValue: props.toValue ? props.toValue : -1 * (modalHeight + 60 + padding),
                duration: 400,
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
            visible={props.showModal}
            onShow={slideIn}
            onDismiss={slideOut}>

            <View style={{ backgroundColor: '#00000085', flex: 1, alignItems: 'center', padding: 10 }} >


                <Animated.View style={{ alignSelf: 'center', height: 20 * 50, width: '100%', marginTop: height, padding: 20, transform: [{ translateY: translateValue }], }}>


                    <TouchableWithoutFeedback onPress={() => { setIsSelected(!isSelected); props.onPinPress(); }}>
                        <View style={styles.topOptionContainer}>
                            <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>{'Pin'}</Text>
                            <SelectionButton isSelected={isSelected} onSelect={() => {
                                setIsSelected(!isSelected);
                            }} />
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => props.onMutePress}>
                        <View style={[styles.middleOptionContainer]}>
                            <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>{'Mute'}</Text>
                            <ToggleButton onToggle={() => { }} isOn={true} />
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => props.onLeavePress}>
                        <View style={styles.bottomOptionContainer}>
                            <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: Colors.light.red }}>{'Leave Class'}</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={props.onCancelPress}
                        style={styles.cancelOption}>
                        <Text style={{ fontFamily: 'KanitMedium', fontSize: 18, color: 'white' }}>Done</Text>

                    </TouchableOpacity>



                </Animated.View >

            </View>


        </Modal>
    )
}

const styles = StyleSheet.create({
    topOptionContainer: {
        backgroundColor: '#333',
        width: '100%',
        padding: 15,
        borderBottomColor: '#474747',
        borderBottomWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },

    middleOptionContainer: {
        backgroundColor: '#333',
        width: '100%',
        padding: 15,
        borderBottomColor: '#474747',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'


    },
    bottomOptionContainer: {
        backgroundColor: '#333',
        width: '100%',
        padding: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

    },
    cancelOption: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#333',
        marginTop: 10,
        borderRadius: 15
    },

})
export default ClassOptionsModal