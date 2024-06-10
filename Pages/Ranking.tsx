import React, { useEffect, useState } from 'react'
import { View ,Text,StyleSheet, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import CajaRanking from '../Componentes/CajaRanking';
import { ObtenerRanking } from '../Funciones_Fetch/Usuario/ObtenerRanking';
import AsyncStorage from "@react-native-async-storage/async-storage";


type RankingProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Ranking'>; 
  };

function Ranking({navigation}:RankingProps) {

  const[ranking,setranking]=useState<any>([]);

  useEffect(()=>{
   obteneranking();
  },[])

  const obteneranking=async()=>{
    try{
        const datauser = await AsyncStorage.getItem("datos");
        const userd = datauser ? JSON.parse(datauser) : null;
        console.log("Datos del usuario:"+userd.rol);
        const datos= await ObtenerRanking();
        var datosfinales;
        if(userd.rol==="Cliente"){
            datosfinales=datos.filter((data:any)=>data.rol==="Cliente");
        }
        else if(userd.rol==="Admi"){
            datosfinales=datos.filter((data:any)=>data.rol==="Admi");
        }

        setranking(datosfinales) 
    }catch(e){
        console.error('Ocurrio un error',e)
    }
  }
  return (
    <View style={styles.container}>
        <Text style={styles.texto}>Rankings de Usuarios</Text>

        <View style={styles.titulos}>
                <Text style={styles.titulo}>Puesto</Text>
                <Text style={styles.titulo}>Usuario</Text>
                <Text style={styles.titulo}>Puntaje</Text>
        </View>

        <ScrollView style={styles.container2}>
            <View style={styles.container3}>

                {ranking?.map((ranki:any,index:number)=>(
                    <CajaRanking id={ranki.id} key={ranki.id} puesto={index+1} nombre={ranki.nombre} foto={ranki.foto} puntaje={ranki.puntaje}/>
                ))}
                
            </View>
            

        </ScrollView>
        
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        gap:20
    },
    texto:{
        fontSize:30,
        color:'green',
        fontWeight:'bold'
    },container2:{
        
        width:'100%',
        height:'100%',
        
        
    },titulo:{
      fontWeight:'bold',
      fontSize:20
    },titulos:{
        
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around'
        
    },container3:{
        gap:20,
        backgroundColor: '#FFD700',
        borderRadius:20,
        padding:10
    
    }
    
})

export default Ranking