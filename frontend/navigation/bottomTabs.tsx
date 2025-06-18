import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import InicioScreen from "../screens/main/inicio.screen";
import GastoScreen from "../screens/main/gasto.screen";
import PresupuestoScreen from "../screens/main/presupuesto.screen";
import AjustesNavigator from "./ajustesNavigator";

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
            case 'Nuevo gasto':
              return <Ionicons name='add-circle-outline' size={size} color={color} />;
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
      <Tabs.Screen name="Nuevo gasto" component={GastoScreen}/>
      <Tabs.Screen name="Presupuesto" component={PresupuestoScreen}/>
      <Tabs.Screen name="Ajustes" component={AjustesNavigator}/>
    </Tabs.Navigator>
  )
}