import { View, Text, Animated, Pressable, StyleSheet, TouchableOpacity, PanResponder } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
import { Colors } from '../constants';
import { useSharedValue } from 'react-native-reanimated';

const FlippableFlashcard = ({ card, reset, margin }) => {

    let flipRotation = 0
    const flipAnimation = useRef(new Animated.Value(0)).current;

    flipAnimation.addListener(({ value }) => {
        flipRotation = value
    })
    useEffect(() => {
        //flip back to front to reset 
        console.log("reset")
        flipToFront()

    }, [reset])

    const flipToFront = () => {
        Animated.spring(flipAnimation, {
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start();
    }

    const flipToBack = () => {
        Animated.spring(flipAnimation, {
            toValue: 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start();
    }
    const flipCard = () => {
        if (flipRotation >= 90) {
            flipToFront();
        }
        else {
            flipToBack();
        }

    }


    const flipToFrontStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }
        ]
    };
    const flipToBackStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }
        ]
    };

    return (

        <TouchableOpacity
            activeOpacity={1}
            onPress={flipCard}
            style={[styles.cardContainer, { marginRight: margin }]}>
            <View>

                <Animated.View style={{ ...styles.flipCard, ...flipToFrontStyle, }}>
                    <Text style={styles.term}>{card.cardFront}</Text>
                </Animated.View>

                <Animated.View style={{ ...styles.flipCard, ...flipToBackStyle, ...styles.cardBack }}>
                    <Text numberOfLines={10} style={styles.definition}>{card.cardBack}</Text>
                </Animated.View>


            </View>

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    flipCard: {
        width: 290,
        height: 200,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        backfaceVisibility: 'hidden'

    },

    cardContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },

    term: {
        color: Colors.light.primary,
        fontSize: 28,
        textAlign: 'center',
        width: "100%",
        alignSelf: 'center',
        fontFamily: 'KanitBold',
        backfaceVisibility: 'hidden'
    },

    definition: {
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
        width: '80%',
        marginLeft: 20,


        alignSelf: 'center',
        fontFamily: 'Kanit'
    },

    cardFront: {
        padding: 10,
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center'

    },
    cardBack: {
        position: 'absolute'


    },
})


export default FlippableFlashcard
