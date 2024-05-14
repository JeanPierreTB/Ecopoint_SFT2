import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Consejos from '../Pages/Consejos';
import Recompesas from '../Pages/Recompesas';
import Comunidad from '../Pages/Comunidad';
import Recorrido from '../Pages/Recorrido';
import Principal from '../Pages/Principal';

const Tab = createBottomTabNavigator();

function BarraInferior() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Inicio'
        component={Principal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Consejos"
        component={Consejos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-bulb-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Recompesas"
        component={Recompesas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-gift-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Comunidad"
        component={Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-people-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="Transaccion"
        component={Recorrido}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-map-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />
    </Tab.Navigator>
  );
}

export default BarraInferior;