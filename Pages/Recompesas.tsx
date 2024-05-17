// Recompesas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView } from 'react-native';
import { RecompensasProps } from '../Types/types';
import CajaObjetivo from '../Componentes/CajaObjetivo';
import { objetivos } from '../data/Objetivos';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Recompesas: React.FC<any> = ({ navigation }:RecompensasProps) => {
  
  


  return (
    <View style={styles.container}>
      <Image
              style={styles.imagen}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/11518/11518760.png"
              }}
            />
      <View style={styles.container2}>
      <Text style={styles.texto}>Muy pronto Recompesas...</Text>
    </View>       
      
      
    </View>
  );
}

const styles=StyleSheet.create({
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
    width:'60%'
  }
})



export default Recompesas;
