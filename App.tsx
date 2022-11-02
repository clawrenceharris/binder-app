// @refresh reset
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
// import AsyncStorage from '@react-native-community/async-storage'
import { LogBox, Text, View } from 'react-native';
import { auth } from './Firebase/firebase';
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  LogBox.ignoreLogs([
    "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle."
  ])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      setLoading(false)
      if (user) {
        setCurrentUser(user)


      }
    })

    return () => unsubscribe()

  }, [])


  const [loaded] = useFonts({
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('./assets/fonts/Kanit-Bold.ttf'),
    KanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
    KanitSemiBold: require('./assets/fonts/Kanit-SemiBold.ttf'),



  });

  if (!loaded) {
    return <Text>Loading...</Text>
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation currentUser={currentUser} colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


