import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Comentario from "../Clases/Comentario";
import CajaComunidad from "../Componentes/CajaComunidad";

function Chatpersonal() {
  const [nombre, setnombre] = useState("");
  const [image, setimage] = useState("");
  const textInputRef = useRef<TextInput>(null);
  const [texto, settexto] = useState("");
  const [info, setinfo] = useState([]);

  useEffect(() => {
    dataamigo();
    datacomentario();
  }, []);

  const dataamigo = async () => {
    const persona = await AsyncStorage.getItem("personachat");
    const pnombre = persona ? JSON.parse(persona) : null;
    const datauser = await AsyncStorage.getItem("datos");
    const userd = datauser ? JSON.parse(datauser) : null;
    console.log(userd);
    setimage(userd.foto);
    setnombre(pnombre);
  };

  const datacomentario = async () => {
    const idusuario = await AsyncStorage.getItem("usuario");
    const usuarioid = idusuario ? JSON.parse(idusuario) : null;
    const amigo = await AsyncStorage.getItem("idamigo");
    const amigoid = amigo ? JSON.parse(amigo) : null;
    const chatamigo = await Comentario.recuperarchatusuario(usuarioid, amigoid);
    chatamigo.map((chat:any)=>console.log(chat.Usuario))
    //console.log("data", chatamigo);
    setinfo(chatamigo);
  };

  const handleclick = async () => {
    const idusuario = await AsyncStorage.getItem("usuario");
    const usuarioid = idusuario ? JSON.parse(idusuario) : null;
    const amigo = await AsyncStorage.getItem("idamigo");
    const amigoid = amigo ? JSON.parse(amigo) : null;
    /*console.log("UsuarioId",usuarioid);
    console.log("AmigoId",amigoid);*/

    const comentario = new Comentario(texto, 4);
    const response = await comentario.agregarcomentariopersonal(
      usuarioid,
      amigoid
    );
    alert(response.mensaje);
    datacomentario();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Chat personal con {nombre} </Text>
        
      </View>

      <ScrollView>
        <View style={styles.container4}>
          {info && info.length > 0 ? (
            info.map((inf: any) => (
              <CajaComunidad
                key={inf.id}
                nombre={inf.Usuario.nombre}
                foto={
                  inf.Usuario?.foto 
                }
                com={inf.des}
                tipo={inf.tipo}
              />
            ))
          ) : (
            <Text>Sin conversación</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.container3}>
        <TextInput
          style={styles.textoinput}
          ref={textInputRef}
          multiline={true}
          numberOfLines={4}
          onChange={(e) => settexto(e.nativeEvent.text)}
        ></TextInput>
        <TouchableOpacity style={styles.boton}>
          <Icon
            name="arrow-right"
            size={30}
            color="green"
            onPress={() => handleclick()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textoinput: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    height: 60,
    textAlign: "center",
    textAlignVertical: "top",
    padding: 10,
  },
  container3: {
    width: "100%",
    padding: 5,
  },
  boton: {
    position: "absolute",
    end: 10,
    top: 17,
  },
  container4: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
});

export default Chatpersonal;
