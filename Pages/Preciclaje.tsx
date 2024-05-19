
import { View,Text, TextInput,TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import PRPapelFactory from '../Clases/Puntodereciclaje/PRPapelFactory';
import APuntodeReciclaje from '../Clases/Puntodereciclaje/APuntodeReciclaje';
import PRPlasticoFactory from '../Clases/Puntodereciclaje/PRPlasticoFactory';
import PRMetalFactory from '../Clases/Puntodereciclaje/PRMetalFactory';
import PRBateriasFactory from '../Clases/Puntodereciclaje/PRBateriasFactory';
import PRRopaFactory from '../Clases/Puntodereciclaje/PRRopaFactory';


type PreciclajeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Preciclaje'>; 
};

export default function Principal({navigation}:PreciclajeProps) {

  const[punto,setpunto]=useState<APuntodeReciclaje|null>(null);
  const[tipo,settipo]=useState<string>("");

  React.useEffect(()=>{
    
    recuperarpunto()
  },[]);


  const crearpuntoderecilajefabrica=(tipo:string,punto:APuntodeReciclaje):APuntodeReciclaje|null=>{
    console.log("id del punto:"+punto.id);
    switch(tipo){
      case "Papel":
        const prPapelFactory=new PRPapelFactory();
        return prPapelFactory.crearpuntoderecilaje(punto.id,punto.latitud,punto.longitud,punto.lugar);
      case "Plástico":
        const prPlasticoFactory=new PRPlasticoFactory();
        return prPlasticoFactory.crearpuntoderecilaje(punto.id,punto.latitud,punto.longitud,punto.lugar);
      case "Metal":
        const prMetalFactory=new PRMetalFactory();
        return prMetalFactory.crearpuntoderecilaje(punto.id,punto.latitud,punto.longitud,punto.lugar);
      case "Baterias":
        const prBateriasFactory=new PRBateriasFactory();
        return prBateriasFactory.crearpuntoderecilaje(punto.id,punto.latitud,punto.longitud,punto.lugar);
      case "Ropa":
        const prRopaFactory=new PRRopaFactory();
        return prRopaFactory.crearpuntoderecilaje(punto.id,punto.latitud,punto.longitud,punto.lugar)
    }
    return null;
  }

  const recuperarpunto = async () => {
    try {
      const storePunto = await AsyncStorage.getItem('punto');
      if (storePunto) {
        const punto = JSON.parse(storePunto);
        console.log(punto);
        const puntoderecilaje=crearpuntoderecilajefabrica(punto.tipo,punto);
        settipo(punto.tipo);
        setpunto(puntoderecilaje);
      }
    } catch (e) {
      console.error('Error al recuperar el punto', e);
    }
  };


  const handleclik=async ()=>{
    try{
        const usuario = await AsyncStorage.getItem('usuario');
        const usuarioObjeto = usuario? JSON.parse(usuario):null;
        console.log("se dio click",usuarioObjeto,punto?.id);
        
        punto?
        punto.realizarpunto(usuarioObjeto,punto?.id,navigation):
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
                <TextInput style={styles.input} value={punto?.lugar} editable={false}/>
            </View>
            <View>
                <Text style={styles.texto}>Tipo</Text>
                <TextInput style={styles.input} value={tipo} editable={false}/>


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

