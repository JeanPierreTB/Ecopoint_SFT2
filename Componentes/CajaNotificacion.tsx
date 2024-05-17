import React from 'react'
import { View,Image,StyleSheet,Text, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import Usuario from '../Clases/Usuario/Usuario';
import AsyncStorage from '@react-native-async-storage/async-storage'


interface Props{
    foto:string,
    nombre:string,
    des:string,
    tipo:number,
    noti:()=>void

}

function CajaNotificacion({foto,nombre,des,tipo,noti}:Props) {

  const handleclilk=async ()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const datos = await AsyncStorage.getItem('datos');
    const usuarioObjeto1 = datos? JSON.parse(datos):null;

    const usuario1=await Usuario.agregaramigos(usuarioObjeto,nombre,usuarioObjeto1.nombre,usuarioObjeto1.foto,`${usuarioObjeto1.nombre} acepto tu soliitud de amistad`,0);
    alert(usuario1);
    noti();
  }
  const handleclilk2=async ()=>{
    const datos = await AsyncStorage.getItem('datos');
    const usuarioObjeto1 = datos? JSON.parse(datos):null;
    const usuario2=await Usuario.amigorechazado(nombre,usuarioObjeto1.nombre,usuarioObjeto1.foto,`${usuarioObjeto1.nombre} ha rechazado tu solicitud de amistad`,0);
    alert(usuario2);
    noti();
  }
  return (
    <View style={styles.container1}>
        <View style={styles.container2}>
        <Image
            style={styles.imagen2}
            source={{
              uri: foto,
            }}
          />
          <Text style={styles.nombre}>{nombre}</Text>
        </View>
        <View>
            <Text style={styles.texto}>{des}</Text>
            
        </View>
        
        {tipo===1 && (
            <View style={styles.container3}>

            <Icon name='check' size={30} color='green' onPress={()=>handleclilk()}/>
            <Icon name='times' size={30} color='red' onPress={()=>handleclilk2()}/>

            </View>
              
            )}
        
    </View>
  )
}

const styles=StyleSheet.create({
    container1:{
        backgroundColor:'#DAC5C1',
        borderRadius:20,
        width:'100%',
        padding:10,
        gap:5
    },
    imagen2:{
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    container2:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    container3:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        width:'100%',
        justifyContent:'flex-end'
        
    },
    boton:{
        backgroundColor:'lightgreen',
        padding:5,
        borderRadius:10,
    },texto:{
        textAlign:'center',
        fontSize:14
    },nombre:{
        fontSize:18
    }

})

export default CajaNotificacion