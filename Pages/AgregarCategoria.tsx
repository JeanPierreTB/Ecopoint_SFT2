
import { View,Text, TextInput,TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import { RealizarPunto } from '../Funciones_Fetch/Puntodereciclaje/RealizarPunto';
import { CategoriasPuntos } from '../Funciones_Fetch/Puntodereciclaje/CategoriasPuntos';
import { AgregarCategoriaF } from '../Funciones_Fetch/Puntodereciclaje/AgregarCategoriaF';

import { Picker } from '@react-native-picker/picker';


type AgregarCategoriaProps = {
    navigation: StackNavigationProp<RootStackParamList, "AgregarCategoria">; 
};

export default function AgregarCategoria({navigation}:AgregarCategoriaProps) {

  const[nombre,setnombre]=useState("");
  const[valor,setvalor]=useState("");
  const[tipo,settipo]=useState("");

  


  

  


  const handleclik=async ()=>{
    if(tipo==="-"){
        return alert("Seleccione un tipo de puntuacion");
    }
    const res=await AgregarCategoriaF(nombre,parseInt(valor),tipo);
    if(res){
        setnombre("");
        setvalor("");
        settipo("");
        alert("Categoria agreada con exito")
        return navigation.navigate("cuenta");
    }

    return alert("No se pudo agregar la categoria")
    
    
    
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Agregar Categoria</Text>
        <View style={styles.container2}>
            <View>
                <Text style={styles.texto}>Nombre de la categoria</Text>
                <TextInput style={styles.input} value={nombre} onChange={(e)=>setnombre(e.nativeEvent.text)}/>
            </View>
            <View>
                <Text style={styles.texto}>Valor de la categoria</Text>
                <TextInput style={styles.input} value={valor} onChange={(e)=>setvalor(e.nativeEvent.text)}/>


            </View>

            <View>
                <Text style={styles.texto}>Tipo de puntuacion</Text>
                <Picker
                    style={styles.pick}
                    selectedValue={tipo}
                    onValueChange={(itemValue:any, itemIndex:any) =>
                        settipo(itemValue)
                      }
            
                >
                <Picker.Item label="-" value="-"/>
                <Picker.Item label="Kilo" value="Kilo"/>
                <Picker.Item label="Cantidad" value="Cantidad"/>




                </Picker>


            </View>

        </View>

        
        <TouchableOpacity style={styles.botones} onPress={()=>handleclik()}>
            <Text style={styles.texto2}>Aceptar</Text>
        </TouchableOpacity>

        
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
        fontSize:35,
        margin:40
    },
    container2:{
        gap:10
    },
    texto:{
        width:300,
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
        width:300
    },
    texto2:{
        textAlign:'center',
        fontSize:20
    },
    pick: {
        width: '100%',
        backgroundColor: 'lightgreen',   
    
      }




})

