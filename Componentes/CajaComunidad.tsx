import React, { useEffect, useState } from 'react'
import { View,Text,Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AprobarComentario } from '../Funciones_Fetch/Usuario/AprobarComentario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecuperarComentarios } from '../Funciones_Fetch/Comentario/RecuperarComentario';



interface Comunidad{
    nombre:string,
    foto:string,
    com:string,
    tipo:number,
    rol?:string,
    aprobado?:boolean,
    reloadpage?:any
}

function CajaComunidad({nombre,foto,com,tipo,rol="Cliente",aprobado=false,reloadpage=null}:Comunidad) {

  const handleclik=async ()=>{

 
    
    const resultado=await AprobarComentario(com);
    if(resultado){
        reloadpage();
    }
    return;

  }

  

  return (

    <View style={[styles.container ,tipo===1? styles.rojo:tipo===2? styles.gris:tipo===3? styles.verde:styles.yellow]}>
        
        {rol==="Admi" && tipo!==5? 
        (
            <View style={styles.container2}>
                <Text style={{fontWeight:'bold'}}>{nombre}</Text>
                <Icon name={aprobado? "check":"clock-o"} size={25} color="white" onPress={()=>handleclik()}/>
            </View>
        ):(
            <Text style={{fontWeight:'bold'}}>{nombre}</Text>
        )}
        <View style={styles.caja}>
        {foto ? ( // Verifica si hay una foto antes de intentar renderizarla
          <Image
            style={styles.imagen}
            source={{ uri: foto }}
          />
        ) : null}
            <Text style={styles.texto}>{com}</Text>
        </View>

        
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        width:'95%',
        height:120,
        borderWidth:1,
        borderRadius:20,
        padding:10,
        
    },
    container2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    rojo:{
        backgroundColor:'red'
    },
    verde:{
        backgroundColor:'green'
    },
    gris:{
        backgroundColor:'grey'
    },
    yellow:{
        backgroundColor:'yellow'
    },
    caja:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:'80%',
        gap:10
    },
    imagen:{
        width:50,
        height:50,
        borderRadius:20,
        
    },
    texto:{
        width:280,
        height:60,
        textAlignVertical:'center'
        
        
    }
})

export default CajaComunidad