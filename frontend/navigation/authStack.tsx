import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BienvenidaScreen from '../screens/bienvenida.screen'
import InicioSesion from '../screens/inicioSesion.screen'
import RegistroScreen from '../screens/registro.screen'
import BottomTabs from './bottomTabs'

export type authStackParamList = {
  Bienvenida: undefined
  InicioSesion: undefined
  Registro: undefined
  // Tabs: undefined
}

const Stack = createNativeStackNavigator<authStackParamList>()
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Bienvenida'>
      <Stack.Screen name='Bienvenida' component={BienvenidaScreen} options={{ headerShown: false }} />
      <Stack.Screen name='InicioSesion' component={InicioSesion} options={{headerShown: false}}/>
      <Stack.Screen name='Registro' component={RegistroScreen} options={{headerShown: false}}/>
      {/* <Stack.Screen name='Tabs' component={BottomTabs} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  )
}