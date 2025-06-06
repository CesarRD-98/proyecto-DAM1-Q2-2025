import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BottomTabsNavigator from './components/BottomTabsNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Maneja la navegacion de pestañas */}
        <BottomTabsNavigator /> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
