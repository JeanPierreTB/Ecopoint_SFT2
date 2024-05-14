import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'


interface Usuario {
  foto: string;
  nombre: string;
  puntaje: number;
  puesto: number;
  id:number;
}

function CajaRanking({ foto, nombre, puntaje, puesto ,id}: Usuario) {
  const[id_usuario,setid_usuario]=useState(null);
  useEffect(()=>{
    obtenerid();
  },[])

  const obtenerid=async ()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    setid_usuario(usuarioObjeto);

  }

  return (
    <View style={[styles.container,id===id_usuario?styles.color:null]}>
      <Text style={styles.puesto}>{puesto}</Text>
      <View style={styles.container2}>
       
          <Image
            style={styles.imagen2}
            source={{
              uri: foto,
            }}
          />
        

        <Text style={styles.texto}>{nombre}</Text>
      </View>
      <Text style={styles.puntaje}>{puntaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imagen2: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  texto: {
    fontSize: 18, // Tamaño de fuente moderado
    fontWeight: 'bold', // Fuente en negrita para resaltar el nombre
    color: 'black', // Color del texto
    fontFamily: 'Roboto', // Familia de fuente (puedes cambiarla según tus preferencias)
    textTransform: 'capitalize',
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    gap:10
  },color:{
    backgroundColor:'#d9d9d9',
    borderRadius:20,
    padding:5
    
  },puesto:{
    fontSize: 24, // Tamaño de fuente grande
    fontWeight: 'bold', // Fuente en negrita
    color: 'green', // Color dorado para resaltar el ranking
    textShadowColor: 'black', // Sombra de texto para destacar más
    textShadowOffset: { width: 1, height: 1 }, // Offset de la sombra
    textShadowRadius: 2,
  },puntaje:{
    fontSize: 20, // Tamaño de fuente
    fontWeight: 'bold', // Fuente en negrita
    color: 'gold', // Color del puntaje
    textShadowColor: 'black', // Sombra de texto para resaltar
    textShadowOffset: { width: 1, height: 1 }, // Offset de la sombra
    textShadowRadius: 2,
  }
});

export default CajaRanking;
