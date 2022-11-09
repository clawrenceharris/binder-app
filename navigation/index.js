//@refresh reset
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Colors } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
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
import Notes from '../screens/Notes';
import { CameraScreen } from '../screens';
import EditPictureToSend from '../screens/EditPictureToSend';
import EditVideoToSend from '../screens/EditVideoToSend';
import EditProfile from '../screens/EditProfile';
import StartScreen from '../screens/StartScreen';
import Settings from '../screens/Settings/Settings';
import CurrentUserProfile from '../screens/CurrentUserProfile';
import AchievementsScreen from '../screens/Achievements';
import SchoolSettings from '../screens/Settings/SchoolSettings';
import DeskPrivacy from '../screens/Settings/DeskPrivacy';
import SearchSelect from '../screens/SearchSelect';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from '../screens/Feed';
import Header from '../components/Header';
import ClassChatroom from '../screens/ClassChatroom';
import NewChat from '../screens/NewChat';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


export default function Navigation({ currentUser, colorScheme }) {

  return (

    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator currentUser={currentUser} />
    </NavigationContainer>
  );
}


function Classroom({ route }) {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#333',
        width: '100%',
      }}
      drawerPosition={'right'} drawerType={'back'}
      drawerContent={() => {
        return (
          <Header
            headerLeft={<></>}
            shadow
            title={'Class Chat'}
          />



        )
      }}>
      <Drawer.Screen name='Feed' children={() => { return <Feed route={route} /> }} />
      <Drawer.Screen name='ClassChatroom' children={() => { return <ClassChatroom route={route} /> }} />


    </Drawer.Navigator>)
}


function RootNavigator({ currentUser }) {
  const colorScheme = useColorScheme();
  return (


    <Stack.Navigator
      initialRouteName='StartScreen'
      screenOptions={{
        headerShown: false,
        headerStyle: {

          backgroundColor: Colors[colorScheme].background,

        },
        headerTintColor: Colors[colorScheme].background,
        headerTitleAlign: 'left',
        animationDuration: 1000 / 7


      }} >


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
          name="SearchSelect"
          component={SearchSelect}
          options={{
            gestureDirection: "vertical",
            presentation: 'modal'

          }}
        />


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
        name="Classroom"
        component={Classroom}
      />




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
        name="CurrentUserProfile"
        component={CurrentUserProfile}
      />

      <Stack.Screen
        name="EditProfile"
        children={({ route }) => { return <EditProfile route={route} /> }}
      />

      <Stack.Screen
        name="Notes"
        children={({ route }) => { return <Notes route={route} /> }}
        options={{
          gestureDirection: 'vertical',

        }}
      />

      <Stack.Screen
        name="PrivateChats"
        component={Chats}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
      />

      <Stack.Screen
        name="EditPictureToSend"
        children={({ route }) => { return <EditPictureToSend route={route} /> }}
        options={{
          animation: 'none',
          gestureEnabled: false,
        }}

      />

      <Stack.Screen
        name="EditVideoToSend"
        children={({ route }) => { return <EditVideoToSend route={route} /> }}
        options={{
          animation: 'none',
          gestureEnabled: false,
        }}

      />

      <Stack.Screen
        name="Chatroom"
        component={Chatroom}
      />

    </Stack.Navigator >
  );
}



