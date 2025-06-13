import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import InicioScreen from "../screens/inicio.screen"
import TransaccionScreen from "../screens/transaccion.screen"
import PresupuestoScreen from "../screens/presupuesto.screen"
import AjustesScreen from "../screens/ajustes/ajustes.screen"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const Tabs = createBottomTabNavigator()
export default function BottomTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarShowLabel: true, 
        tabBarActiveTintColor: '#34D399', 
        tabBarInactiveTintColor: '#6B7280', 
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 100,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Inicio':
              return <Ionicons name='home-outline' size={size} color={color} />;
            case 'Transacciones':
              return <MaterialCommunityIcons name='swap-horizontal' size={size} color={color} />;
            case 'Presupuesto':
              return <Ionicons name='pie-chart-outline' size={size} color={color} />;
            case 'Ajustes':
              return <Ionicons name='settings-outline' size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tabs.Screen name="Inicio" component={InicioScreen} />
      <Tabs.Screen name="Transacciones" component={TransaccionScreen}/>
      <Tabs.Screen name="Presupuesto" component={PresupuestoScreen}/>
      <Tabs.Screen name="Ajustes" component={AjustesScreen}/>
    </Tabs.Navigator>
  )
}