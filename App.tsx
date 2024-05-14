import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator,Dimensions } from 'react-native';
import Inicio from './Pages/Inicio';
import Iniciodesesion from './Pages/Iniciodesesion';
import Registrate from './Pages/Registrate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from './Pages/Principal';
import BarraInferior from './Componentes/BarraInferior';
import Perfil from './Pages/Perfil';
import Cuenta from './Pages/Cuenta';
import Soporte from './Pages/Soporte';
import PFrecuentes from './Pages/PFrecuentes';
import Ecomentarios from './Pages/Ecomentarios';
import OContraseña from './Pages/OContraseña';
import Preciclaje from './Pages/Preciclaje';
import Foto from './Pages/Foto';
import AgregarAmigos from './Pages/AgregarAmigos';
import Misamigos from './Pages/Misamigos';
import Notificaciones from './Pages/Notificaciones';
import Chatpersonal from './Pages/Chatpersonal';



const Stack = createStackNavigator();

const CargaInicial: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cargaCompleta, setCargaCompleta] = useState(false);

  useEffect(() => {
    const tiempoCarga = setTimeout(() => {
      setCargaCompleta(true);
    }, 4000);

    return () => clearTimeout(tiempoCarga);
  }, []);

  if (!cargaCompleta) {
    return (
      <View style={styles.cargandoContainer}>
        <Image
          style={styles.imagen}
          source={{uri:'https://w0.peakpx.com/wallpaper/945/662/HD-wallpaper-bosque-arboles-natural-naturaleza-paz.jpg'}}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="inicio">
        <Stack.Screen name="inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen
          name="sesion"
          component={Iniciodesesion}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="registrarte"
          component={Registrate}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen 
          name='Preciclaje'
          component={Preciclaje}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        
        />

        <Stack.Screen 
          name='foto'
          component={Foto}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        
        />
        <Stack.Screen
          name="principal"
          component={BarraInferior}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="perfil"
          component={Perfil}
          options={{headerShown:false}}
        
        />

        <Stack.Screen
          name="agregar"
          component={AgregarAmigos}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="misamigos"
          component={Misamigos}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="notificaciones"
          component={Notificaciones}
          options={{headerShown:false}}
        />


        <Stack.Screen
          name="cuenta"
          component={Cuenta}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="chatpersonal"
          component={Chatpersonal}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="soporte"
          component={Soporte}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        />

        <Stack.Screen
          name="pregunta"
          component={PFrecuentes}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        />

        <Stack.Screen
          name="enviar"
          component={Ecomentarios}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        />

        <Stack.Screen
          name="ocontra"
          component={OContraseña}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderBottomWidth: 0,
            },
          }}
        />



      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cargandoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen:{
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height, 
    resizeMode: 'cover',
  }
});

export default CargaInicial;
