import React from 'react'
import { View,Text,Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


interface Comunidad{
    nombre:string,
    foto:string,
    com:string,
    tipo:number,
}

function CajaComunidad({nombre,foto,com,tipo}:Comunidad) {
  return (

    <View style={[styles.container ,tipo===1? styles.rojo:tipo===2? styles.gris:styles.verde]}>
        
        <Text style={{fontWeight:'bold'}}>{nombre}</Text>
        <View style={styles.caja}>
            <Image
            style={styles.imagen}
            source={{ uri: foto }}
            />
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
    rojo:{
        backgroundColor:'red'
    },
    verde:{
        backgroundColor:'green'
    },
    gris:{
        backgroundColor:'grey'
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