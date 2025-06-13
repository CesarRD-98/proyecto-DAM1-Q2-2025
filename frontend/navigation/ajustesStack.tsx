import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AjustesScreen from '../screens/ajustes/ajustes.screen'
import PerfilScreen from '../screens/ajustes/perfil.screen'
import HistorialScreen from '../screens/ajustes/historial.screen'
import EstadisticasScreen from '../screens/ajustes/estadisticas.screen'
import ContrasenaScreen from '../screens/ajustes/contrasena.screen'

const Stack = createNativeStackNavigator()
export default function AjustesStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Ajustes' component={AjustesScreen}/>
        <Stack.Screen name='Perfil' component={PerfilScreen}/>
        <Stack.Screen name='Historial' component={HistorialScreen}/>
        <Stack.Screen name='Estadisticas' component={EstadisticasScreen}/>
        <Stack.Screen name='Contrasena' component={ContrasenaScreen}/>
    </Stack.Navigator>
  )
}