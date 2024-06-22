import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Consejos from '../Pages/Consejos';
import Recompesas from '../Pages/Recompesas';
import Comunidad from '../Pages/Comunidad';
import Recorrido from '../Pages/Transaccion';
import Principal from '../Pages/Principal';
import Transaccion from '../Pages/Transaccion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatosUsuario } from '../Funciones_Fetch/Usuario/DatosUsuario';


const Tab = createBottomTabNavigator();

function BarraInferior() {

  const[rol,setrol]=useState('Cliente');

  useEffect(()=>{
    barrarenderizado();
  },[]);

  const barrarenderizado=async()=>{
    const usuarioid = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuarioid ? JSON.parse(usuarioid) : null;
    const data=await DatosUsuario(usuarioObjeto);
    setrol(data.rol);
  }
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

      {rol==="Cliente"? 
      (<Tab.Screen
        name="Transaccion"
        component={Transaccion}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-map-outline" size={size} color={color} />
          ),
          headerShown: false,
          unmountOnBlur: true
        }}
      />):
      null}
      
      
    </Tab.Navigator>
  );
}

export default BarraInferior;