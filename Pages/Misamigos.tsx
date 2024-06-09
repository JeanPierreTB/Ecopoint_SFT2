import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CajaAmigos from "../Componentes/CajaAmigos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import { MisamigosF } from "../Funciones_Fetch/Usuario/Misamigos";

type MisamigosProps = {
  navigation: StackNavigationProp<RootStackParamList, 'misamigos'>; 
};

const Misamigos: React.FC<MisamigosProps> = ({ navigation }) => {

  const [amigos, setamigos] = useState([]);

  useEffect(() => {
    recuperarmisamigos();
  }, []);

  const recuperarmisamigos = async () => {
    const usuario = await AsyncStorage.getItem("usuario");
    const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
    const usuario1= await MisamigosF(usuarioObjeto);
    setamigos(usuario1.data);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis amigos</Text>
      <View style={styles.container2}>
        <Text style={styles.subtitulo}>Nombre</Text>
        <Text style={styles.subtitulo}>Puntaje</Text>
        <Text style={styles.subtitulo}>Chat</Text>
      </View>
      {amigos.length === 0 && (
        <View style={styles.container4}>
          <Text style={styles.texto}>Sin amigos</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.container3}>
          {amigos.map((amigo: any) => (
            <CajaAmigos
              key={amigo.id}
              foto={amigo.foto}
              nombre={amigo.nombre}
              puntaje={amigo.puntaje}
              tipo={false}
              id={amigo.id}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Misamigos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 40,
    marginTop:40
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container2: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  container3: {
    marginLeft: 5,
    width: "93%",
    gap: 20,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container4: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});