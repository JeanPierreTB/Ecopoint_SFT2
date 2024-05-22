import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Text, View,TouchableOpacity ,StyleSheet,Alert} from 'react-native'
import Usuario from "../Clases/Usuario_Vista/Usuario"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';

type OContraProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ocontra'>; 
};


const OContraseña: React.FC<OContraProps> = ({ navigation }) => {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const handleclik = () => {
    

    if (!password && !email) {
        Alert.alert('Error', 'Completa todos los campos');
    } 
    else{
        const usuario=new Usuario(email,password);
        usuario.changepassword(password,navigation);
        setemail('');
        setpassword('');
    }
    
  };

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Cambio de contraseña</Text>
        <View style={styles.ocontra}>
            <View>
                <Text style={styles.texto}>Correo Electronico</Text>
                <TextInput style={styles.input} keyboardType="email-address" value={email} onChange={(e)=>setemail(e.nativeEvent.text)}></TextInput>
            </View>
            <View>
                <Text style={styles.texto}>Nueva Contraseña</Text>
                <TextInput style={styles.input} secureTextEntry={true}  value={password} onChange={(e)=>setpassword(e.nativeEvent.text)}></TextInput>
            </View>
            <TouchableOpacity style={styles.boton} onPress={()=>handleclik()}>
                <Text style={styles.textob}>CAMBIAR</Text>
            </TouchableOpacity>

        </View>
        
        
        
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:170
    },
    titulo:{
        fontSize:30,
        fontWeight:'bold'
    },
    ocontra:{
        marginTop:30,
        gap:15        
    },
    texto:{
        width:200,
        fontSize:20
    },
    
    input:{
        borderColor:'black',
        width:300,
        height:50,
        borderWidth:1,
        borderRadius:10,
        textAlign:'center'
    },
    boton:{
        marginTop:10,
        backgroundColor:'lightgreen',
        padding:10,
        borderRadius:10,
        width:300
    },
    textob:{
        textAlign:'center'
    }



})

export default OContraseña