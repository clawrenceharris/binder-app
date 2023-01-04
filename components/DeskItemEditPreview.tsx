import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { assets, Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';

interface Props {
    cardFront?: string;
    cardBack?: string;
    isCardFrontImage?: boolean;
    isCardBackImage?: boolean;
    onRemovePress: () => void;
    style?: ViewStyle;
    isFlashcard?: boolean;
    file?: string;

}
const DeskItemEditPreview: FC<Props> = (props) => {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.mainContainer, { ...props.style }]}>

            {props.isFlashcard || false ?
                <View style={[styles.mainContainer, { ...props.style }]}>
                    <View style={[styles.cardContainerLeft, { marginTop: 10 }]}>


                        {!props.isCardFrontImage ?
                            <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 24 }}>{props.cardFront}</Text>
                            :
                            <Image source={{ uri: props.cardFront }} style={{ width: '100%', height: '100%' }} />

                        }



                        <TouchableOpacity
                            onPress={props.onRemovePress}
                            style={[styles.cornerButton, { left: 10 }]}>
                            <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                        </TouchableOpacity>



                    </View>
                    <View style={[styles.cardContainerLeft, { marginTop: 10 }]}>

                        {!props.isCardBackImage ?
                            <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16 }}>{props.cardBack}</Text>
                            :
                            <Image source={{ uri: props.cardBack }} style={{ width: '100%', height: '100%' }} />

                        }


                    </View>
                </View>
                :
                <View style={[styles.mainContainer, { ...props.style }]}>

                    <Image source={{ uri: props.file }} style={{ width: '100%', height: '100%' }} />





                    <TouchableOpacity
                        onPress={props.onRemovePress}
                        style={[styles.cornerButton, { left: 10 }]}>
                        <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                    </TouchableOpacity>
                </View>
            }




        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardContainerRight: {

        width: 175,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    cardContainerLeft: {
        width: 175,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    cornerButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#00000060',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },




})
export default DeskItemEditPreview