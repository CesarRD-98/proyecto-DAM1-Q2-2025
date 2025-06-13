import React, { useEffect, useState } from 'react';
import { Platform, Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import AuthStack from './navigation/authStack';
import BottomTabs from './navigation/bottomTabs';
import InicioSesionProvider from './providers/inicioSesionProvider';
import { getToken } from './utils/tokenStorage';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(()=> {
   const loadToken = async () => {
    const storedToken = await getToken()
    if (storedToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
   } 
   loadToken()
  }, [])

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <InicioSesionProvider>
            {isAuthenticated ? <BottomTabs /> : <AuthStack />}
          </InicioSesionProvider>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : undefined
  },
});

