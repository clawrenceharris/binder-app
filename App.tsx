// @refresh reset
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './screens/Navigator';

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('./assets/fonts/Kanit-Bold.ttf'),
    KanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
    KanitSemiBold: require('./assets/fonts/Kanit-SemiBold.ttf'),
  });




  if (!loaded) {
    return <Text style={StyleSheet.absoluteFillObject}>{"Loading..."}</Text>
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider >

        <Navigation colorScheme={colorScheme} />
        <StatusBar style={'light'} />
      </SafeAreaProvider>
    );

  }
}






