import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet} from 'react-native';
import { ConsejosProps } from '../Types/types';
import CajaConsejos from '../Componentes/CajaConsejos';
import { RecuperarConsejos } from '../Funciones_Fetch/Consejos/RecuperarConsejos';

const imagenes=[
  'https://cdn-icons-png.flaticon.com/512/9494/9494567.png',
  'https://cdn-icons-png.flaticon.com/512/9494/9494600.png',
  'https://cdn-icons-png.flaticon.com/512/9494/9494620.png',
  'https://cdn-icons-png.flaticon.com/512/9494/9494623.png',
  'https://cdn-icons-png.flaticon.com/512/9494/9494626.png'

]


const Consejos: React.FC<any> = ({ navigation}:ConsejosProps) => {

  const[consejoshoy,setconsejoshoy]=useState<any[]>([]);

  useEffect(()=>{
    mostrarconsejo();
  },[])

  async function mostrarconsejo(){
    try{
      const todosconsejos=await RecuperarConsejos();
      setconsejoshoy(todosconsejos)
    }catch(e){
      console.log('Ocurrio un error',e)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Consejos de hoy</Text>
        {consejoshoy.map((consejo,index)=>(
          <CajaConsejos id={consejo.id} key={consejo.id} url={imagenes[index]} des={consejo.des}/>
        ))}


    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    marginTop:40,
    flex:1,
    
  },
  texto:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30
  }
})

export default Consejos;

