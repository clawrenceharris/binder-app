import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { SHADOWS, SIZES } from '../constants/Theme'
import { assets } from '../constants'

const Header = (props) => {
    const styles = StyleSheet.create({
        shadows: {
            ...SHADOWS.light,
            shadowColor: '#272727'
        },

        title: {
            fontFamily: 'KanitMedium',
            color: 'white',
            fontSize: 22,
        },

        mainContainer: {
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            height: !props.isModal ? SIZES.header : SIZES.header - 40,
            padding: 5,
            backgroundColor: '#333',
            zIndex: 1,
            borderBottomColor: 'gray',
            borderBottomWidth: props.border ? 0.2 : 0
        },

        centerContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: !props.isModal ? 30 : 0
        },

        rightContainer: {
            position: 'absolute',
            right: 20,
            paddingTop: 30,

        },

        leftContainer: {
            position: 'absolute',
            left: 20,
            paddingTop: 30
        }
    })
    return (
        <View style={[styles.mainContainer, props.shadow && styles.shadows]}>
            <View style={styles.leftContainer}>
                {!props.headerLeft ?
                    !props.isModal && <BackButton
                        navigation={props.navigation}
                        color={'white'}
                        direction={props.direction ? props.direction : 'horizontal'} />
                    :
                    props.headerLeft
                }

            </View>
            <View style={styles.centerContainer}>


                {!props.headerCenter ?
                    <View style={{ alignItems: 'center' }} >
                        {props.isModal && <View style={{ width: '80%', height: 5, borderRadius: 25, backgroundColor: 'gray', marginBottom: 10 }} />}
                        <Text style={styles.title}>{props.title}</Text>

                    </View>
                    :
                    props.headerCenter

                }
            </View>

            <View style={styles.rightContainer}>
                {props.headerRight}

            </View>


        </View>

    )
}


export default Header