import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { SHADOWS, SIZES } from '../constants/Theme'

const Header = ({ navigation, title, props, shadow, headerLeft = null, headerCenter = null, headerRight = null, direction = 'horizontal' }) => {
    return (
        <View style={[styles.mainContainer, shadow && styles.shadows]}>
            <View style={styles.leftContainer}>
                {!headerLeft ?
                    <BackButton
                        navigation={navigation}
                        margin={0}
                        color={'white'}
                        direction={direction} />
                    :
                    headerLeft
                }

            </View>
            <View style={styles.centerContainer}>


                {!headerCenter ? <Text style={styles.title}>{title}</Text>
                    :
                    headerCenter

                }
            </View>

            <View style={styles.rightContainer}>
                {headerRight}

            </View>


        </View>

    )
}

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
        height: SIZES.header,
        padding: 5,
        backgroundColor: '#333',
        zIndex: 1
    },

    centerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 30
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
export default Header