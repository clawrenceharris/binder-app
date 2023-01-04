import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabScreenProps, BottomTabParamList } from '../types';
import { CameraScreen, Chats, Classes, Profile } from '../screens';
import Desk from '../screens/Desk';
import Playground from '../screens/Playground';
import { SHADOWS, SIZES } from '../constants/Theme';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import Chat from '../screens/Chat';
import CurrentUserProfile from '../screens/CurrentUserProfile';
import Settings from '../screens/Settings/Settings';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import EditNameModal from '../components/EditNameModal';

const Drawer = createDrawerNavigator();



function ClassesScreen({ navigation }) {


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Classes navigation={navigation} />

        </View>
    )
}

function ChatScreen({ navigation }) {


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Chat navigation={navigation} />

        </View>
    )
}

function DeskScreen({ navigation }) {


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Desk navigation={navigation} />

        </View>
    )
}


function Camera({ navigation }) {


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <CameraScreen navigation={navigation} />

        </View>
    )
}



const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'lightgray',

        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    }
})










export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    const BottomTab = createBottomTabNavigator();
    const ICON_SIZE = 28

    return (

        <BottomTab.Navigator
            initialRouteName="Root"

            screenOptions={{

                tabBarStyle: {
                    backgroundColor: 'black',
                    height: 90,
                    borderTopColor: 'black',



                },
                tabBarActiveTintColor: Colors.primary,

                headerTitleStyle: { fontFamily: 'KanitBold', fontSize: 26, color: Colors.light.background },

            }}>


            <BottomTab.Screen
                name="Classes"

                component={ClassesScreen}
                options={{

                    headerShown: false,
                    title: '',
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.book} style={{ tintColor: focused ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )


                }}

            />




            <BottomTab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.send} style={{ tintColor: focused ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE, transform: [{ rotateZ: '-90deg' }] }} />
                        </View>
                    )
                }}
            />




            <BottomTab.Screen
                name="Post"
                component={Camera}
                options={{

                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ focused }) => (


                        <Image
                            source={assets.capture}
                            style={{ tintColor: focused ? Colors.accent : 'rgb(225,228,233)', width: 30, height: 30, top: 20 }}
                        />

                    ),

                }}
            />





            <BottomTab.Screen

                name="Desk"
                component={DeskScreen}
                options={{
                    title: '',
                    headerShown: false,

                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.desk} style={{ tintColor: focused ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )
                }}
            />



            <BottomTab.Screen
                name="Playground"
                component={Playground}
                options={{
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ focused }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.playground} style={{ tintColor: focused ? Colors.primary : 'rgb(225,228,233)', width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )
                }}
            />

        </BottomTab.Navigator>
    );
}
