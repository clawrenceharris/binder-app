import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabScreenProps, BottomTabParamList } from '../types';
import { ClassesScreen } from '../screens';
import Desk from '../screens/Desk';
import Playground from '../screens/Playground';
import { SHADOWS, SIZES } from '../constants/Theme';
import { UserProfileCircle } from '../components';


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

                name="Desk"
                children={() => { return <Desk currentUser={currentUser} /> }}
                options={{
                    title: 'Desk',
                    headerShown: false,

                    tabBarIcon: ({ color }) => <Image source={assets.desk} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                }}
            />

            <BottomTab.Screen
                name="Home"

                component={ClassesScreen}
                options={{

                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Image source={assets.school} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />


                }}

            />



            <BottomTab.Screen
                name="Playground"
                children={() => { return <Playground currentUser={currentUser} /> }}
                options={{
                    headerShown: false,

                    title: 'Playground',
                    tabBarIcon: ({ color }) => <Image source={assets.playground} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                }}
            />
        </BottomTab.Navigator>
    );
}
