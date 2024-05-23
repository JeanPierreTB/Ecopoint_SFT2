import React, { useEffect, useState } from 'react'
import { TouchableOpacity,Text,StyleSheet,View,Image, Alert } from 'react-native'
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'
import ios from '../assets/ios.png'
import { TextInput } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import { objetivos } from '../data/Objetivos'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verificarcuenta } from '../Funciones_Fetch/Usuario/Verificarcuenta'
import { islogin } from '../Funciones_Fetch/Usuario/Islogin'
import { Register } from '../Funciones_Fetch/Usuario/Register'





WebBrowser.maybeCompleteAuthSession();

type IniciodesesionProps = {
    navigation: StackNavigationProp<RootStackParamList, 'sesion'>; 
};

const Iniciodesesion: React.FC<IniciodesesionProps> = ({ navigation }) => {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "74457487730-a5mueg90o0hkbf54m90kspn6tu1kg2c6.apps.googleusercontent.com"
  });

 

  

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    console.log("info del user:" + (user?.email || 'Usuario no encontrado'));
    if (response?.type === "success") {
      const userInfoResponse = await getUserInfo(response.authentication?.accessToken);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  }

  const getUserInfo = async (token:any) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const user = await response.json();
      console.log("Respuesta de la API de Google:", user);
      almacenarusuario(user);
      
  
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  const almacenarusuario=async(user:any)=>{

    const respuesta=await verificarcuenta(user.email);
    if(respuesta){
        console.log("aqui ni deberia")
        await islogin(user.email,"",navigation);
        
    }else{
        console.log("Esta bien")
        await Register(user.email,"",0,0);
        console.log("acabe de registrame");
        await islogin(user.email,"",navigation);

    }
    
  }


  const handleclik = async () => {
    const campos=[email,password];
    if(campos.some(campo=>!campo)){
        Alert.alert('Error',"Completa los campos")
    }
    else{
        await islogin(email,password,navigation);
        
        setemail('');
        setpassword('');
    }

    
  };
  
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Iniciar sesion</Text>
        <View style={styles.sesion1}>
            <View>
                <Text style={styles.textoboton}>Correo Electronico</Text>
                <TextInput style={styles.boton} keyboardType="email-address" value={email} onChange={(e)=>setemail(e.nativeEvent.text)}/>
            </View>
            <View>
                <Text style={styles.textoboton}>Contraseña</Text>
                <TextInput style={styles.boton} secureTextEntry={true}  value={password} onChange={(e)=>setpassword(e.nativeEvent.text)}/>
                <Text style={styles.contra}>¿Olvido tu contraseña?<Text style={styles.negrita} onPress={()=>navigation.navigate('ocontra')}> Cambiala aqui</Text></Text> 
            </View>
        </View>
        <TouchableOpacity style={styles.botonentrada} onPress={()=>handleclik()}>
            <Text style={styles.textoentrada}>INICIAR SESION</Text>
        </TouchableOpacity>
        <Text style={styles.des}>Al iniciar sesion,aceptas las Condiciones de Servicio y la Politica de Privacidad</Text>
        
            
        <Text style={styles.textoinicio}>Inicia sesion con</Text>
        
        <View style={styles.sesionContainer}>
    <TouchableOpacity
        disabled={!request}
        onPress={() => {
            promptAsync();
        }}
        style={styles.sesionButton}
    >
        <Image
            style={styles.sesionIcon}
            source={google}
        />
        <Text style={styles.sesionText}>Iniciar sesión con Google</Text>
    </TouchableOpacity>
</View>

        
        <Text style={styles.textoinicio}>¿No tiene una cuenta? <Text style={styles.negrita} onPress={()=>navigation.navigate('registrarte')}>Registrate</Text></Text>
        
        
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        marginTop:-70,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    titulo:{
        fontWeight:'bold',
        fontSize:40,
        margin:40
    },
    sesion1:{
        gap:10
    },
    boton:{
        borderColor:'black',
        width:300,
        height:50,
        borderWidth:1,
        borderRadius:10,
        textAlign:'center'
    },
    textoboton:{
        width:200,
        fontSize:20
    },
    contra:{
        textAlign:'right',
        margin:5,
        fontSize:12
    },
    negrita:{
        fontWeight:'bold'
    },
    botonentrada:{
        margin:20,
        backgroundColor:'lightgreen',
        padding:10,
        borderRadius:10,
        width:300
    },
    textoentrada:{
        textAlign:'center',
        fontSize:20
    },
    des:{
        marginTop:50,
        width:250,
        textAlign:'center',
        fontSize:12
    },
    textoinicio:{
        color:'gray',
        fontSize:15,
        marginTop:15
    },
    sesionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    sesionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sesionIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    sesionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    
   
});

export default Iniciodesesion;
