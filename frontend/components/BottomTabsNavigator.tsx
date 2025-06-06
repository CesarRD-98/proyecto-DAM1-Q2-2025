import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Inicio from '../screens/inicio';
import Transaccion from '../screens/transaccion';

export default function BottomTabsNavigator() {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Inicio' component={Inicio}></Tab.Screen>
                <Tab.Screen name='Transacción' component={Transaccion}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
