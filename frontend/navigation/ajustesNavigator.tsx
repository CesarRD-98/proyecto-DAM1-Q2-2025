import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PerfilScreen from '../screens/ajustes/perfil.screen'
import HistorialScreen from '../screens/ajustes/historial.screen'
import EstadisticasScreen from '../screens/ajustes/estadisticas.screen'
import ContrasenaScreen from '../screens/ajustes/contrasena.screen'
import AjustesScreen from '../screens/main/ajustes.screen'

export type authStackParamListAjustes = {
  AjustesHome: undefined
  Perfil: undefined
  Historial: undefined
  Estadisticas: undefined
  Contrasena: undefined
}

const Stack = createNativeStackNavigator<authStackParamListAjustes>()
export default function AjustesNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='AjustesHome' component={AjustesScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={PerfilScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Historial' component={HistorialScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Estadisticas' component={EstadisticasScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Contrasena' component={ContrasenaScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}