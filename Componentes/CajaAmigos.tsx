import React, { useEffect, useState } from 'react'
import { View ,Image,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Usuario from '../Clases/Usuario_Vista/Usuario';
import Notifiacion from '../Clases/Notifiacion';
import Comentario from '../Clases/Comentario/Comentario';




interface Props{
    foto:string,
    nombre:string,
    puntaje:string,
    tipo?:boolean,
    id:number,
    onupdate?:()=>void,
    navigation?:any
}

function CajaAmigos({foto,nombre,puntaje,tipo=true,id,onupdate,navigation}:Props) {

  const[agregado,setagreado]=useState(false);

  const handleclik=async ()=>{
    
    const usuario = await AsyncStorage.getItem('nombre');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const data=await AsyncStorage.getItem('datos');
    const dataobjeto=data? JSON.parse(data):null;

    console.log("esto es de nombre",usuarioObjeto)
    const noti=new Notifiacion(`${dataobjeto.nombre} te ha enviado una solictud de amistad`,1,dataobjeto.nombre,dataobjeto.foto);
    const respuesta=await noti.agregarnotifiacionamigo(id);
    if(respuesta.res){
      setagreado(true);
    }
    alert(respuesta.mensaje);
   
    if (typeof onupdate === 'function') {
      onupdate();
    }
    
  }

 const handlechatpersonal=()=>{
  AsyncStorage.setItem('personachat', JSON.stringify(nombre));
  AsyncStorage.setItem('idamigo',JSON.stringify(id));
  navigation.navigate("chatpersonal")
 }

  
  return (
    <View style={styles.container}>
      {tipo && (
        <>
          {agregado ? (
            <Icon name="clock-o" size={25} color="green" />
          ) : (
            <TouchableOpacity onPress={() => handleclik()}>
              <Icon name="user-plus" size={25} color="green" />
            </TouchableOpacity>
          )}
        </>
      )}

        {/*<TouchableOpacity >
        <Icon name="user-plus" size={25} color="green" onPress={()=>handleclik()} />
        </TouchableOpacity>}*/}
      
        


        <View style={styles.container2}>
        <Image
            style={styles.foto}
            source={{
              uri: foto,
            }}
          />
          <Text style={styles.texto}>{nombre}</Text>
        </View>
        
        <Text style={styles.texto}>{puntaje}</Text>

        {!tipo &&(
          <TouchableOpacity onPress={()=>handlechatpersonal()}>
              <Icon name="comment" size={25} color="green" />
          </TouchableOpacity>
        )}
          
    </View>
  )
}

export default CajaAmigos


const styles=StyleSheet.create({
    container:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-around',
       width:'100%',
       padding:5,
       borderRadius:20,
       backgroundColor:'lightgreen'
    },
    foto:{
        width:50,
        height:50,
        borderRadius:20
    },
    texto:{
        fontSize: 16, // Tamaño de fuente moderado
        fontWeight: 'bold', // Fuente en negrita para resaltar el nombre
        color: 'black', // Color del texto
        fontFamily: 'Roboto', // Familia de fuente (puedes cambiarla según tus preferencias)
        textTransform: 'capitalize',
    },
    container2:{
        flexDirection:'row',
        alignItems:'center',
        width:'25%',
        justifyContent:'space-between',
        marginLeft:-50
        
    }

})