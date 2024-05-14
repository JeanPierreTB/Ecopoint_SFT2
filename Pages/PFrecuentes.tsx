import React from 'react'
import { View,Text ,StyleSheet} from 'react-native'
import CajaPreguntas from '../Componentes/CajaPreguntas'

function PFrecuentes() {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Preguntas Frecuentes</Text>
        <View style={styles.caja}>
            <CajaPreguntas des="No se que hago aqui es solo una prueba para saber que todo este bien sino me salgo"/>
            <CajaPreguntas des="No se que hago aqui es solo una prueba para saber que todo este bien sino me salgo"/>
            <CajaPreguntas des="No se que hago aqui es solo una prueba para saber que todo este bien sino me salgo"/>
            <CajaPreguntas des="No se que hago aqui es solo una prueba para saber que todo este bien sino me salgo"/>
        </View>
        

    </View>
    
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    titulo:{
        color:'green',
        fontSize:20
    },
    caja:{
        marginTop:30,
        alignItems:'center',
        gap:20,
    }
})

export default PFrecuentes