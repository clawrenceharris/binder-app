import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabScreenProps, BottomTabParamList } from '../types';
import { Chats, ClassesScreen, Profile } from '../screens';
import Desk from '../screens/Desk';
import Playground from '../screens/Playground';
import { SHADOWS, SIZES } from '../constants/Theme';
import { UserProfileCircle } from '../components';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import Chat from '../screens/Chat';
import CurrentUserProfile from '../screens/CurrentUserProfile';
import Settings from '../screens/Settings/Settings';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();






function ChatScreen({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Chat"
            drawerStyle={{
                backgroundColor: '#333',
                width: '80%',
            }}
            drawerType={'slide'}
            drawerContent={() => {
                return (
                    <CurrentUserProfile navigation={navigation} />



                )
            }}>
            <Drawer.Screen name='Chat' component={Chat} />
            <Drawer.Screen name='Profile' component={CurrentUserProfile} />


        </Drawer.Navigator>)
}

function Home({ navigation }) {


    return (

        <Drawer.Navigator

            initialRouteName="Classes"
            drawerStyle={{
                backgroundColor: '#333',
                width: '80%',
            }}
            drawerType={'slide'}
            drawerContent={() => {
                return (
                    <CurrentUserProfile navigation={navigation} />



                )
            }}>
            <Drawer.Screen name='Classes' component={ClassesScreen} />
            <Drawer.Screen name='Profile' component={CurrentUserProfile} />


        </Drawer.Navigator>)
}

export default function BottomTabNavigator({ currentUser }) {
    const colorScheme = useColorScheme();
    const BottomTab = createBottomTabNavigator();
    const ICON_SIZE = 28
    return (

        <BottomTab.Navigator
            initialRouteName="Home"

            screenOptions={{

                tabBarStyle: { backgroundColor: '#1F1F1F', borderTopWidth: 0, height: 90, ...SHADOWS[colorScheme], shadowOffset: { height: -3, width: 0 }, shadowColor: colorScheme === 'light' ? '#272727' : 'black', shadowRadius: 1 },
                tabBarActiveTintColor: Colors[colorScheme].primary,

                headerTitleStyle: { fontFamily: 'KanitBold', fontSize: 26, color: Colors.light.background },

            }}>


            <BottomTab.Screen
                name="Home"

                component={Home}
                options={{

                    headerShown: false,
                    title: '',
                    tabBarIcon: ({ color }) => <Image source={assets.school} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />


                }}

            />






            <BottomTab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ color }) => <Image source={assets.send} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE, transform: [{ rotateZ: '-45deg' }] }} />
                }}
            />

            <BottomTab.Screen

                name="Desk"
                children={() => { return <Desk currentUser={currentUser} /> }}
                options={{
                    title: '',
                    headerShown: false,

                    tabBarIcon: ({ color }) => <Image source={assets.desk} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                }}
            />
        </BottomTab.Navigator>
    );
}
