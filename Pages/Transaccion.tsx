import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text,Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TransaccionProps } from '../Types/types';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";
import Usuario from '../Clases/Usuario_Vista/Usuario';



const Transaccion: React.FC<any> = ({ navigation }: TransaccionProps) => {
  

  return (
    <View style={styles.container}>
      <Image
              style={styles.imagen}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/11518/11518760.png"
              }}
            />
      <View style={styles.container2}>
      <Text style={styles.texto}>Muy pronto Transaccion...</Text>
    </View>       
      
      
    </View>
  );
};

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
    width:'50%'
  }
});

export default Transaccion;
