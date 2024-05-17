import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation ,useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PuntodeReciclaje from "../Clases/Puntodereciclaje/PuntodeReciclaje";
import Usuario from "../Clases/Usuario/Usuario";
import { Dimensions } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from "react-native-maps-directions";
import { Picker } from '@react-native-picker/picker';


type PrincipalProps = {
  navigation: StackNavigationProp<RootStackParamList, "principal">;
};

export default function Principal({ navigation }: PrincipalProps) {
  const isFocused = useIsFocused(); // Hook para determinar si la pantalla está enfocada
  const [origin, setOrigin] = useState({
    latitude: -12.0500,
    longitude: -77.03,
  });

  const [puntosrec, setPuntosRec] = useState<any[]>([]);
  const [puntosar, setPuntosAr] = useState<any[]>([]);
  const [datos, setDatos] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPoints = await PuntodeReciclaje.visualizarpuntos();
        setPuntosRec(allPoints);
      } catch (error) {
        console.log("Ocurrió un error ", error);
      }
    };

    const getPoints = async () => {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
        const usuarioData = await Usuario.datosusuario(usuarioObjeto);
        const puntosRealizar = await PuntodeReciclaje.obtenerpuntosarelizar(usuarioData.id);
        setPuntosAr(puntosRealizar);
      } catch (e) {
        console.log("Ocurrió un error ", e);
      }
    };

    const getLocationPermission = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAw5ap8PEu1JO6Ia1k1frTPktbdTDGuuhk`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        //console.log(data); // Agrega este console.log para verificar la estructura de la respuesta
        const { location } = data;
        setOrigin({ latitude: location.lat, longitude: location.lng });
      } catch (error:any) {
        console.error("Error al obtener la ubicación:", error.message);
      }
    };
    
    
    
    
    const fetchUserData = async () => {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
        const usuarioData = await Usuario.datosusuario(usuarioObjeto);
        console.log("esto del usuario:"+usuarioData.foto);
        setDatos(usuarioData);
      } catch (e) {
        console.error('Ocurrió un error', e);
      }
    };

    
    if (isFocused) { 
      fetchUserData();
      getLocationPermission();
      fetchData();
      getPoints();
      
    }

    
  }, [isFocused,selectedCategory]);

  const handlePunto = async (punto: PuntodeReciclaje) => {
    try {
      await AsyncStorage.setItem("punto", JSON.stringify(punto));
      navigation.navigate("Preciclaje");
    } catch (error) {
      console.error("Error al almacenar el punto:", error);
    }
  };

  
  const handlePickerChange = (itemValue: string) => {
    setSelectedCategory(itemValue);
  };

  const filteredPoints = selectedCategory
    ? puntosrec.filter(punto => punto.tipo === selectedCategory)
    : puntosrec;

  return (
    <View style={styles.container}>
      <View style={styles.principal1}>
        <View>
          <Text style={styles.titulo}>Bienvenido!</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={handlePickerChange}
          >
            <Picker.Item label="-" value="" />
            <Picker.Item label="Papel" value="Papel" />
            <Picker.Item label="Plástico" value="Plástico" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Baterias" value="Baterias" />
            <Picker.Item label="Ropa" value="Ropa" />
          </Picker>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("perfil")}>
        {datos && datos.foto && (
            <Image
              style={styles.imagen}
              source={{
                uri: datos.foto
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.principal2}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker coordinate={origin} />

          {filteredPoints.map((punto) => (
            <Marker
              key={punto.id}
              coordinate={{
                latitude: punto.latitud,
                longitude: punto.longitud,
              }}
              title={punto.lugar}
              onPress={() => handlePunto(punto)}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/9830/9830813.png",
                }}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
          ))}

          {puntosar.map((punto) => (
            <MapViewDirections
              key={punto.id}
              origin={origin}
              destination={{
                latitude: punto.latitud,
                longitude: punto.longitud,
              }}
              apikey="AIzaSyAw5ap8PEu1JO6Ia1k1frTPktbdTDGuuhk"
              strokeWidth={5}
              strokeColor="green"
            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 40,
  },
  input: {
    borderColor: "black",
    width: 200,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  principal1: {
    flexDirection: "row",
    backgroundColor: "lightgreen",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  principal2: {},
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },picker: {
    fontSize: 15,
  }
});
