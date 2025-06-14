import React from 'react';
import { Platform, Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './navigation/authStack';
import BottomTabs from './navigation/bottomTabs';
import AuthProvider, { useAuth } from './providers/authProvider';

export default function App() {

  function AppContent() {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) return <View style={{ flex: 1, backgroundColor: 'white' }} />
    return isAuthenticated ? <BottomTabs/> : <AuthStack />
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
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

