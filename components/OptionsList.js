import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../constants'
import ToggleSwitch from 'toggle-switch-react-native'

const OptionsList = (props) => {
    const [isOn, setIsOn] = useState(props.isOn)
    const getIcon = (title) => {

        switch (title) {
            case 'Pin': return assets.thumbtack;
            case 'Bookmark': return assets.bookmark;
            case 'Share': return assets.send_o;
            case 'Reply': return assets.reply;
            case 'Delete': return assets.trash;
            case 'Clear Desk': return assets.trash;
            case 'Edit': return assets.pencil;
            case 'Public': return assets.unlock;
            case 'New Notes': return assets.add;
            case 'Leave Group': return assets.leave;
            case 'Desk Settings': return assets.settings;
            case 'Mute': return assets.bell;
            case 'Copy': return assets.copy;
            case 'Bookmarked':

        }
        return null
    }

    const getColor = (title) => {
        switch (title) {

            case 'Delete': return Colors.light.red;
            case 'Clear Desk': return Colors.light.red;
            case 'Leave Group': return Colors.light.red;



        }
        return 'white'
    }
    return (
        <View>
            {props.options?.map((item, index) =>
                <TouchableWithoutFeedback
                    key={index.toString()}
                    onPress={() => {
                        props.onOptionPress[index]()
                        if (index === props.switchIndex) {
                            setIsOn(!isOn);
                            props.onToggle();
                        }


                    }}>

                    <View style={[
                        index === 0 ? styles.topOptionContainer : styles.middleOptionContainer,
                        index === props.options.length - 1 ? styles.bottomOptionContainer : styles.middleOptionContainer]}>
                        <View style={{ flexDirection: 'row' }}>
                            {getIcon(item) != null && <Image source={getIcon(item)} style={{ width: 25, height: 25, tintColor: 'white' }} />}
                            <Text style={{ marginLeft: 10, fontFamily: 'KanitMedium', fontSize: 18, color: getColor(item) }}>{item}</Text>

                        </View>


                        {index === props.switchIndex &&
                            <ToggleSwitch
                                animationSpeed={100}

                                onToggle={() => {
                                    props.onToggle();
                                    setIsOn(!isOn)
                                }}
                                isOn={isOn}
                                onColor={Colors.light.primary}
                                size={'large'}
                                offColor={'#646464'} />}

                    </View>
                </TouchableWithoutFeedback>


            )}
        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    middleOptionContainer: {
        backgroundColor: '#333',
        width: '100%',
        padding: 15,
        borderBottomColor: '#474747',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'





    },
    bottomOptionContainer: {
        backgroundColor: '#333',
        width: '100%',
        padding: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'



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
    }
})
export default OptionsList