import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CajaNotificacion from "../Componentes/CajaNotificacion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VerNotificaciones } from "../Funciones_Fetch/Notificacion/Vernotificaciones";

function Notificaciones() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    mostrarnotifiaciones();
  }, []);

  const mostrarnotifiaciones = async () => {
    const usuario = await AsyncStorage.getItem("usuario");
    const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
    const usuario1 = await AsyncStorage.getItem("");
    const noti = await VerNotificaciones(usuarioObjeto);
    console.log(noti);
    setdata(noti);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Notificaciones</Text>
      {data.length === 0 && (
        <View style={styles.container4}>
          <Text style={styles.texto}>Sin Notificaciones</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.container2}>
          {data.map((dat: any, index: number) => (
            <CajaNotificacion
              noti={mostrarnotifiaciones}
              key={index}
              des={dat.des}
              tipo={dat.tipo}
              foto={dat.foto}
              nombre={dat.nombre}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:40
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  container2: {
    marginTop: 20,
    width: "100%",
    gap: 10,
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

export default Notificaciones;