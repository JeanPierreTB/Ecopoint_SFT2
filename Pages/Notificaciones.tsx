import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView,Image } from "react-native";
import CajaNotificacion from "../Componentes/CajaNotificacion";
import Notifiacion from "../Clases/Notifiacion";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Notificaciones() {
  
  return (
    <View style={styles.container}>
      <Image
              style={styles.imagen}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/11518/11518760.png"
              }}
            />
      <View style={styles.container2}>
      <Text style={styles.texto}>Muy pronto Notificaciones...</Text>
    </View>       
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:20,
    
  },
  texto:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30
  },
  imagen:{
    width:100,
    height:100
  },container2:{
    width:'65%'
  }
});

export default Notificaciones;
