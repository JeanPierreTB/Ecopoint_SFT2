import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Cajaestadistica from "../Componentes/Cajaestadistica";
import BarraInferior from "../Componentes/BarraInferior";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Types/types";
import Usuario from "../Clases/Usuario/Usuario";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";


type PerfilProps = {
  navigation: StackNavigationProp<RootStackParamList, "perfil">;
};

function Perfil({ navigation }: PerfilProps) {

  const[datos,setdatos]=useState<any>();  

  useEffect(()=>{
    
  
      obtenerDatos();
  },[])

  const obtenerDatos = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
      console.log(usuarioObjeto);
      const datosUsuario = await Usuario.datosusuario(usuarioObjeto);
      
      setdatos(datosUsuario);
      
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      obtenerDatos();
    }, [])
  );
  


  return (
    <View style={styles.container}>
      <Image
        style={styles.imagen}
        source={{
          uri: "https://concepto.de/wp-content/uploads/2018/10/bosque2-e1539893598295.jpg",
        }}
      />
      <Icon style={styles.icon} name="bell" size={30} color='green' onPress={()=>navigation.navigate("notificaciones")} />
      {datos && datos.foto && (
            <Image
              style={styles.imagen2}
              source={{
                uri: datos.foto
              }}
            />
          )}

      
      <Text style={styles.texto}>{datos?.nombre}</Text>
      
      <Text style={styles.numero}>+51 {datos?.ntelefono}</Text>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton}>
          <Icon name="user-plus" size={20} color="green" />
          <Text style={styles.textob} onPress={()=>navigation.navigate("agregar")}>AGREGAR AMIGOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton}>
          <Icon name="users" size={20} color="green" />
          <Text style={styles.textob} onPress={()=>navigation.navigate("misamigos")}>MIS AMIGOS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.borde}></View>
      <Text style={styles.textoe}>Estadisticas</Text>
      <View style={styles.estadis}>
        <View style={styles.filaEstadis}>
          <Cajaestadistica namei="recycle" puntaje="-" des="Puntos reciclados" />{/*puntos obtenidos */}
          <Cajaestadistica namei="calendar" puntaje="-" des="Puntaje usuario" />{/*puntos reciclados */}
        </View>
        <View style={styles.filaEstadis}>
          <Cajaestadistica namei="star" puntaje="-" des="Recompesas" />{/*ranking usuario */}
          <Cajaestadistica namei="trophy" puntaje="-" des="Ranking" />{/*Recompesas obtendidas */}
        </View>
      </View>
      <View style={styles.borde}></View>

      <View style={styles.texic}>
        <Icon name="cog" size={30} color="black" />
        <Text onPress={() => navigation.navigate("cuenta")}>Configuracion</Text>
      </View>
      <View style={styles.texic}>
        <Icon name="star" size={30} color="black" />
        <Text onPress={() => navigation.navigate("Ranking")}>Ranking</Text>
      </View>
      <View style={styles.texic}>
        <Icon name="sign-out" size={30} color="red" />
        <Text onPress={() => navigation.navigate("sesion")}>Cerrar sesion</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  imagen2: {
    borderColor: "white",
    borderWidth: 4,
    width: 150,
    height: 150,
    borderRadius: 50,
    marginTop: -100,
  },
  texto: {
    color: "green",
    fontSize: 30,
  },
  numero: {
    color: "gray",
    fontSize: 15,
  },
  botones: {
    marginTop: 10,
    flexDirection: "row",
    gap: 15,
  },
  boton: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
  },
  textob: {
    color: "green",
    fontSize: 15,
  },
  borde: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    marginTop: 20,
  },
  textoe: {
    color: "green",
    marginLeft: 10,
    width: "100%",
    fontSize: 20,
  },
  estadis: {
    marginTop: 20,
    gap: 20,
    padding: 10,
  },

  filaEstadis: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  texic: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: 10,
  },
  icon:{
   position:'absolute',
   right:10,
   top:4
  }
});

export default Perfil;
