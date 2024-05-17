
import { View,Text, TextInput,TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import PuntodeReciclaje from '../Clases/Puntodereciclaje/PuntodeReciclaje';


type PreciclajeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Preciclaje'>; 
};

export default function Principal({navigation}:PreciclajeProps) {

  const[punto,setpunto]=useState<PuntodeReciclaje|null>(null);

  React.useEffect(()=>{
    
    recuperarpunto()
  },[]);


  const recuperarpunto = async () => {
    try {
      const storePunto = await AsyncStorage.getItem('punto');
      if (storePunto) {
        const punto = JSON.parse(storePunto);
        console.log(punto);
  
        // Aquí creas una nueva instancia de PuntodeReciclaje con los valores recuperados
        const nuevoPunto = new PuntodeReciclaje(
          punto.id || 0,
          punto.latitud || 0,
          punto.longitud || 0,
          punto.lugar || '',
          punto.tipo || 0
        );
  
        setpunto(nuevoPunto);
      }
    } catch (e) {
      console.error('Error al recuperar el punto', e);
    }
  };


  const handleclik=async ()=>{
    try{
        const usuario = await AsyncStorage.getItem('usuario');
        const usuarioObjeto = usuario? JSON.parse(usuario):null;
        console.log("se dio click",usuarioObjeto,punto?.getid());
        punto?
        PuntodeReciclaje.realizarpunto(usuarioObjeto,punto?.getid(),navigation):
        alert("Oucrrio un error")
    }catch(e){
        console.error('Error al recuperar el punto', e);
    }
    
    
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Punto de reciclaje</Text>
        <View style={styles.container2}>
            <View>
                <Text style={styles.texto}>Lugar</Text>
                <TextInput style={styles.input} value={punto?.getlugar()} editable={false}/>
            </View>
            <View>
                <Text style={styles.texto}>Tipo</Text>
                <TextInput style={styles.input} value={String(punto?.gettipo())} editable={false}/>


            </View>

        </View>

        <View style={styles.container3}>
        <TouchableOpacity style={styles.botones} onPress={()=>navigation.navigate("principal")}>
            <Text style={styles.texto2}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botones} onPress={()=>handleclik()}>
            <Text style={styles.texto2}>Aceptar</Text>
        </TouchableOpacity>

        </View>
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        marginTop:-150,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    titulo:{
        fontWeight:'bold',
        fontSize:38,
        margin:40
    },
    container2:{
        gap:10
    },
    texto:{
        width:200,
        fontSize:20
    },
    input:{
        borderColor:'black',
        width:300,
        height:50,
        borderWidth:1,
        borderRadius:10,
        textAlign:'center',
        color:'black'
    },

    container3:{
        flexDirection:'row'
    },

    botones:{
        margin:20,
        backgroundColor:'lightgreen',
        padding:10,
        borderRadius:10,
        width:120
    },
    texto2:{
        textAlign:'center',
        fontSize:20
    }




})

