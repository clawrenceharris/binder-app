//@refresh reset
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Colors } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import {
  Chatroom,
  Chats,
  Profile,
  SignIn,
  SignUpBirthday,
  SignUpEmailPassword,
  SignUpName,
  SignUpPhoto,
  SignUpSchool,
  BirthdaySettings,
  EmailSettings,
  GPASetttings,
  NameSettings,
  PasswordSettings,
  GraduationYearSettings,
} from '../screens';

import { CameraScreen } from '../screens';
import EditPictureToSend from '../screens/EditPictureToSend';
import EditVideoToSend from '../screens/EditVideoToSend';
import StartScreen from '../screens/StartScreen';
import Settings from '../screens/Settings/Settings';
import AchievementsScreen from '../screens/Achievements';
import SchoolSettings from '../screens/Settings/SchoolSettings';
import DeskPrivacy from '../screens/Settings/DeskPrivacy';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from '../screens/Feed';
import NewChat from '../screens/NewChat';
import NewDeskItem from '../screens/NewDeskItem';
import DeskItem from '../screens/DeskItem';
import BookmarkedItems from '../screens/BookmarkedItems';
import AddClasses from '../screens/AddClasses';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


export default function Navigation({ colorScheme }) {

  return (

    <NavigationContainer>
      <RootNavigator theme={colorScheme === 'light' ? DefaultTheme : DarkTheme} />
    </NavigationContainer>
  );
}


function Classroom({ route }) {
  return (
    <Drawer.Navigator
      initialRouteName='Chatroom'
      drawerStyle={{
        backgroundColor: '#333',
        width: '100%',
      }}
      drawerPosition={'right'} drawerType={'back'}
      drawerContent={() => {
        return (
          <Feed route={route} />)
      }}>
      <Drawer.Screen name='Feed' children={() => { return <Feed route={route} /> }} />
      <Drawer.Screen name='Chatroom' children={() => { return <Chatroom route={route} /> }} />


    </Drawer.Navigator>)
}


function RootNavigator({ theme }) {
  return (


    <Stack.Navigator
      initialRouteName='StartScreen'
      screenOptions={{
        headerShown: false,
        animationDuration: 200

      }} >

      {/* authentication screens */}
      <Stack.Group
        initialRouteName="StartScreen"
        screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="StartScreen"
          component={StartScreen} />

        <Stack.Screen
          name="SignUpName"
          component={SignUpName}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="SignUpBirthday"
          component={SignUpBirthday} />

        <Stack.Screen
          name="SignUpSchool"
          component={SignUpSchool} />

        <Stack.Screen
          name="SignUpPhoto"
          component={SignUpPhoto} />



        <Stack.Screen
          name="SignUpEmailPassword"
          component={SignUpEmailPassword}

        />

        <Stack.Screen
          name="SignIn"
          component={SignIn}

        />


      </Stack.Group >



      <Stack.Screen
        name="Root"
        children={() => { return <BottomTabNavigator /> }}
      />


      {/* settings screens */}
      <Stack.Group>

        <Stack.Screen
          name="Settings"
          component={Settings}
        />

        <Stack.Screen
          name="SchoolSettings"
          component={SchoolSettings}
        />

        <Stack.Screen
          name="DeskPrivacy"
          component={DeskPrivacy}
        />

        <Stack.Screen
          name="GraduationYearSettings"
          component={GraduationYearSettings}
        />

        <Stack.Screen
          name="BirthdaySettings"
          component={BirthdaySettings}
        />

        <Stack.Screen
          name="NameSettings"
          component={NameSettings}
        />

        <Stack.Screen
          name="EmailSettings"
          component={EmailSettings}
        />

        <Stack.Screen
          name="PasswordSettings"
          component={PasswordSettings}
        />

        <Stack.Screen
          name="GPASettings"
          component={GPASetttings}
        />
      </Stack.Group>


      <Stack.Screen
        name="Profile"
        component={Profile}
      />


      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          gestureDirection: "vertical",
          presentation: 'modal'

        }}
      />

      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          presentation: 'modal'

        }}

      />
      <Stack.Screen
        name="AddClasses"
        component={AddClasses}
        options={{
          gestureDirection: "vertical",
          presentation: 'modal'

        }}
      />

      <Stack.Screen
        name="Classroom"
        component={Classroom}
      />


      <Stack.Screen
        name="PrivateChats"
        component={Chats}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          gestureDirection: 'vertical',
        }}
      />


      <Stack.Screen
        name="Chatroom"
        component={Chatroom}
      />


      <Stack.Screen
        name="NewDeskItem"
        component={NewDeskItem}
        options={{
          gestureDirection: "vertical",

        }}

      />


      <Stack.Screen
        name="DeskItem"
        component={DeskItem}
        options={{
          gestureDirection: "vertical",

        }}

      />


      <Stack.Screen
        name="BookmarkedItems"
        component={BookmarkedItems}
        options={{
          gestureDirection: "vertical",

        }}

      />


    </Stack.Navigator >
  );
}



