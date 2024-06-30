import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CajaAmigos from "../Componentes/CajaAmigos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ObtenernoAmigos } from "../Funciones_Fetch/Usuario/ObtenerAmigos";

function AgregarAmigos() {
  const [usuarios, setusuarios] = useState<any>([]);

  useEffect(() => {
    obtenerinfo();
  }, []);

  const obtenerinfo = async () => {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
      const usuarios = await ObtenernoAmigos(usuarioObjeto);
      console.log(usuarios);
      setusuarios(usuarios);
    } catch (e) {
      console.error("Ocurrio un error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Amigos de la plataforma</Text>
      <View style={styles.container3}>
        <Text style={styles.subtitulo}>Agregar</Text>
        <Text style={styles.subtitulo}>Nombre</Text>
        <Text style={styles.subtitulo}>Puntaje</Text>
      </View>
      {usuarios.length === 0 && 
      <View style={styles.container4}>
      <Text style={styles.texto}>Eres amigos de todos</Text>
      </View>
      }
      <ScrollView>
        <View style={styles.container2}>
          {usuarios.map((usuario: any) => (
            <CajaAmigos
              onupdate={obtenerinfo}
              id={usuario.id}
              key={usuario.id}
              foto={usuario.foto}
              nombre={usuario.nombre}
              puntaje={usuario.puntaje}
              rol={usuario.rol}
              
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default AgregarAmigos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    gap: 50,
    marginTop:40
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container2: {
    gap: 20,
  },texto:{
    fontSize: 20,
    fontWeight: "bold",
  },container4:{
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  }
});