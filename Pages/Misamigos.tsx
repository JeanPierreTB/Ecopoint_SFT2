import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView,Image } from "react-native";
import CajaAmigos from "../Componentes/CajaAmigos";
import Usuario from "../Clases/Usuario_Vista/Usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';

type MisamigosProps = {
  navigation: StackNavigationProp<RootStackParamList, 'misamigos'>; 
};

const Misamigos: React.FC<MisamigosProps> = ({ navigation }) => {

  
  return (
    <View style={styles.container}>
      <Image
              style={styles.imagen}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/11518/11518760.png"
              }}
            />
      <View style={styles.container2}>
      <Text style={styles.texto}>Muy pronto Mis Amigos...</Text>
    </View>       
      
      
    </View>
  );
}

export default Misamigos;

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
    width:'55%'
  }
});
