// Recompesas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView } from 'react-native';
import { RecompensasProps } from '../Types/types';
import CajaObjetivo from '../Componentes/CajaObjetivo';
import Objetivo from '../Clases/Objetivo';
import Recompesa from '../Clases/Recompesa';
import { objetivos } from '../data/Objetivos';
import AsyncStorage from '@react-native-async-storage/async-storage'


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
      const allobjetivos:any=await Objetivo.recuperarobjetivos(usuarioObjeto);
      setobjetivos(allobjetivos);
    }catch(e){
      console.log('Ocurrio un error',e)
    }
  }

  const obtenerecompesa=async()=>{
    const recompesasemanal=await Recompesa.obtenerrecompesasemanal();
    console.log(recompesasemanal.imagen);
    setrecompesasem(recompesasemanal);
  }

  const actualizarobjetivos=async()=>{

    console.log("hello")
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;

    const objetivosactualizados=await Objetivo.actualizarobjetivoshoy(usuarioObjeto);
    console.log("Hola falso")
    if(objetivosactualizados.res){
      console.log("hola true")
      recuperarobjetivos();
    }

  }


  const obtenerganador=async()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const ganador=await Recompesa.obtenerganador(usuarioObjeto);
    if(ganador.res){
      setmensaje(ganador.mensaje)
    }
    
    
  }

  const poblarobjetivos = async (objetivos: any[]) => {
    alert('Hola')

    for (let i = 0; i < objetivos.length; i++) {
      const obj = new Objetivo(objetivos[i].des, objetivos[i].puntos, objetivos[i].dia);
      const res: any = await obj.agregarobjetivo();
      if (!res.res) {
        // En caso de error, puedes manejarlo aquí
        console.error("Error al agregar objetivo:", res.mensaje);
        break; // Rompe el bucle en caso de error
      }
    }
  };


  return (
    <View style={styles.recompesa}>
      <View style={styles.container}>
        <Text style={styles.texto}>Recompesa en:{recompesasem?.puntaje} puntos</Text>
        <Image
              style={styles.imagen}
              source={{uri:recompesasem?.imagen}}/>
        <Text style={styles.texto}>{mensaje===""? recompesasem?.des:mensaje}</Text>
      </View> 
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
