import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatosUsuario } from '../Funciones_Fetch/Usuario/DatosUsuario';
import { ActualizarDatos } from '../Funciones_Fetch/Usuario/ActualizarDatos';
import Icon from "react-native-vector-icons/FontAwesome";



type CuentaProps = {
  navigation: StackNavigationProp<RootStackParamList, "cuenta">;
};

function Cuenta({ navigation }: CuentaProps) {
  const [Nombre, setNombre] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [DNI, setDNI] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [rol,setrol]=useState('');

  useFocusEffect(
    React.useCallback(() => {
      datosusuario();
    }, [])
  );

  useEffect(() => {
    datosusuario();
  }, []);

  const datosusuario = async () => {
    const usuarioid = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuarioid ? JSON.parse(usuarioid) : null;
    const data=await DatosUsuario(usuarioObjeto);
    
    setNombre(data.nombre);
    if (data.ntelefono !== null && data.dni !== null) {
      if(data.contrasena===""){
        setContrasena("Indefinido")
      }
      else{
        setContrasena(data.contrasena)
      }
      setTelefono(String(data.ntelefono));
      setDNI(String(data.dni));
      
    }
    else {
      setTelefono("No definido");
      setDNI("No definido");
      setContrasena("Indefinido");
    }

    setrol(data.rol)

  }

  const handleclik = async () => {
    const campos = [Nombre, Telefono, DNI, Contrasena];
    if (campos.some(campo => !campo)) {
      Alert.alert('Error', 'Completa todos los campos');
    }
    else {
      const usuarioid = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuarioid ? JSON.parse(usuarioid) : null;
      let respuesta;

      
      
      if (Contrasena === "Indefinido") {
        console.log("Enetre aqui");
        //respuesta=await usuario.actualizadatos(usuarioObjeto,verificationStrategy);
        respuesta=await ActualizarDatos(usuarioObjeto,Nombre,"Indefinido",parseInt(DNI),parseInt(Telefono));

      }
      else {
        //respuesta=await usuario.actualizadatos(usuarioObjeto,verificationStrategy);
        respuesta=await ActualizarDatos(usuarioObjeto,Nombre,Contrasena,parseInt(DNI),parseInt(Telefono));

        
      }

      if (respuesta.res) {
        Alert.alert('Exito', 'Campos actualizados');
        if(rol==="Cliente") navigation.navigate("perfil");
        else if(rol==="Admi") navigation.navigate("principal");

      } else {
        Alert.alert('Error',respuesta.mensaje);
      }


    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, marginTop: 10 }}
    >
      <View style={styles.container}>
        {rol==="Cliente"? 
        (<Text style={styles.titulo}>Mi cuenta</Text>):
        (
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Text style={styles.titulo}>Mi cuenta</Text>
        <Icon name="sign-out" size={30} color="red" onPress={() => navigation.navigate("sesion")} />
        </View>
        
        )  
      
      }
        
        <View style={styles.cuenta}>
          <View style={styles.inputContainer}>
            <Text style={styles.texto}>Usuario</Text>
            <TextInput style={styles.input} value={Nombre} onChange={(e) => setNombre(e.nativeEvent.text)} editable={Contrasena !== "Indefinido"} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.texto}>Telefono</Text>
            <TextInput style={styles.input} value={Telefono} onChange={(e) => setTelefono(e.nativeEvent.text)} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.texto}>DNI</Text>
            <TextInput style={styles.input} value={DNI} onChange={(e) => setDNI(e.nativeEvent.text)} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.texto}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={Contrasena}
              onChange={(text) => setContrasena(text.nativeEvent.text)}
              editable={Contrasena !== "Indefinido"}
            />
          </View>

          <TouchableOpacity style={styles.boton} onPress={() => handleclik()}>
            <Text style={styles.textob}>Confirmar</Text>
          </TouchableOpacity>



          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("foto")}>
            <Text style={styles.textob}>Actualizar foto</Text>
          </TouchableOpacity>



        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  titulo: {
    marginLeft: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cuenta: {
    marginTop: 50,
    alignItems: 'center',
    gap: 40,
    height: '100%',
  },
  inputContainer: {
    width: '80%'
  },
  texto: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    width: '100%',
    height: 60,
    borderRadius: 20,
    textAlign: 'center'
  },
  boton: {
    backgroundColor: 'lightgreen',
    width: '80%',
    padding: 10,
    borderRadius: 20,
    height: 60
  },
  textob: {
    textAlign: 'center',
    marginTop: 10,
    color: 'green'
  }
});

export default Cuenta;
