import React, { useEffect } from 'react'
import { View ,Image,StyleSheet,Text, TouchableOpacity} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import { URL2 } from '../URL/URL';
import { Consejo } from '../data/Consejo';
import { objetivos } from '../data/Objetivos';

type InicioProps = {
    navigation: StackNavigationProp<RootStackParamList, 'inicio'>;
  };

export default function Inicio({ navigation }: InicioProps) {

   useEffect(()=>{
    /*poblarconsejos();
    poblarobjetivos();
    poblarrecompesa();
    poblaradmi();*/
   },[]);
   
   const poblarconsejos = async () => {
    for (const consejo of Consejo) {
        await fetch(`${URL2}agregar-consejo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                des: consejo.des,
                dia: consejo.dia,
            }),
        });
    }
};

const poblarobjetivos = async () => {
    for (const objetivo of objetivos) {
        console.log('Enviando objetivo:', objetivo); // Log para depuración
        const response = await fetch(`${URL2}agregar-objetivo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                des: objetivo.des,
                dia: objetivo.dia,
                puntos: objetivo.puntos,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar objetivo');
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data); // Log para depuración
    }
};

   const poblarrecompesa=async()=>{
        await fetch(`${URL2}agregar-recompesa`,{
            
            method:'POST',
            headers: {
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fechainicio:'2024/07/08',
                fechafin:'2024/07/14',
                imagen:'https://www.nike.com.pe/on/demandware.static/-/Sites-catalog-equinox/default/dw4706a276/images/hi-res/196608241423_1_20240125120000-mrtPeru.jpg',
                des:"Air Jordan",
                puntaje:1200,
                stock:2
            }),
        })
   }


   const poblaradmi=async()=>{
    await fetch(`${URL2}insertar-usuario`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nombre:"admi@gmail.com",
        contrasena:"12345678",
        dni:12345678,
        ntelefono:123456789,
        rol:"Admi"
    }),
    })
   }
  return (
    <View style={styles.container}>
        <View>
            <Image
            style={styles.imagen}
            source={{uri:"https://cdn-icons-png.flaticon.com/512/3299/3299954.png"}}/>
            <Text style={styles.texto}>ECOPOINT</Text>
        </View>
        <View style={styles.inicio2}>
            <TouchableOpacity style={styles.boton} onPress={()=>navigation.navigate('sesion')}>
                <Text style={styles.textob}>Ya tengo una cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={()=>navigation.navigate("registrarte")}>
                <Text style={styles.textob}>No tenga una cuenta</Text>
            </TouchableOpacity>
        </View>
        

    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:50
    },
    imagen:{
        width:300,
        height:300
    },
    texto:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:30
    },
    inicio2:{
        gap:10
    },
    boton:{
        backgroundColor:'#004d00',
        borderRadius:10,
        paddingHorizontal:70,
        paddingVertical:20
    },
    textob:{
        color:'white'
        
    }

})
