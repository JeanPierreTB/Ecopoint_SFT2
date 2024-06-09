// Recompesas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView } from 'react-native';
import { RecompensasProps } from '../Types/types';
import CajaObjetivo from '../Componentes/CajaObjetivo';
import { RecuperarObjetivos } from '../Funciones_Fetch/Objetivo/RecuperarObjetivos';
import { ObtenerRecompesassemanal } from '../Funciones_Fetch/Recompesa/ObtenereRecompesasemanal';
import { Actualizarobjetivoshoy } from '../Funciones_Fetch/Objetivo/Actualizarobjetivoshoy';
import { ObtenerGanador } from '../Funciones_Fetch/Recompesa/Obtenerganador';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AgregarNotificacionamigo } from '../Funciones_Fetch/Notificacion/AgregarNotificacionamigo';


const Recompesas: React.FC<any> = ({ navigation }:RecompensasProps) => {
  
  const[objetivos,setobjetivos]=useState<any[]>([]);
  const[recompesasem,setrecompesasem]=useState<any>();
  const[mensaje,setmensaje]=useState("");

  useEffect(()=>{
    //poblarobjetivos(objetivos);
    obtenerecompesa();
    recuperarobjetivos();
    actualizarobjetivos();
    obtenerganador();
  },[]);

  const recuperarobjetivos=async ()=>{
    try{
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario? JSON.parse(usuario):null;
      const allobjetivos:any=await RecuperarObjetivos(usuarioObjeto);
      setobjetivos(allobjetivos);
    }catch(e){
      console.log('Ocurrio un error',e)
    }
  }

  const obtenerecompesa=async()=>{
    const recompesasemanal=await ObtenerRecompesassemanal();
    setrecompesasem(recompesasemanal);
  }

  const actualizarobjetivos=async()=>{

    console.log("hello")
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;

    const objetivosactualizados=await Actualizarobjetivoshoy(usuarioObjeto);
    console.log("Hola falso")
    if(objetivosactualizados.res){
      console.log("hola true")
      recuperarobjetivos();
    }

  }


  const obtenerganador=async()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const datos = await AsyncStorage.getItem('datos');
    const usuarioObjeto1 = datos? JSON.parse(datos):null;
    const ganador=await ObtenerGanador(usuarioObjeto);
    if(ganador.res){
      await AgregarNotificacionamigo(usuarioObjeto,'Usted ha ganado el premio de la semana',0,usuarioObjeto1.nombre,usuarioObjeto1.foto)
      setmensaje(ganador.mensaje)
    }
    
    
  }

  


  return (
    <View style={styles.recompesa}>
      {recompesasem === null ? (
        <Text>Recompesa no disponible</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.texto}>Recompesa en: {recompesasem?.puntaje} puntos</Text>
          {recompesasem?.imagen ? (
            <Image
              style={styles.imagen}
              source={{ uri: recompesasem.imagen }}
            />
          ) : (
            <Text style={styles.texto}>Imagen no disponible</Text>
          )}
          <Text style={styles.texto}>{mensaje === "" ? recompesasem?.des : mensaje}</Text>
        </View>
      )}
      <Text style={styles.titulo}>Objetivos</Text>
       <ScrollView>

        {objetivos.map(objetivo=>(
          <CajaObjetivo key={objetivo.id} titulo={objetivo.des} recompesa={objetivo.puntos} porcentaje={objetivo.Usuarios[0]?.Objetivo_Usuario?.porcentaje}/>
        ))}
        

      </ScrollView>
      
    </View>
  );
}

const styles=StyleSheet.create({
  recompesa:{
    flex:1,
    marginTop:40
  },
  container:{
    alignItems:'center',
    gap:10,
  },
  imagen:{
    width:150,
    height:150,
    borderRadius:20
  },
  texto:{
    fontSize:15,
    fontWeight:'bold'
  },
  titulo:{
    fontWeight:'bold',
    fontSize:20,
  }
})



export default Recompesas;