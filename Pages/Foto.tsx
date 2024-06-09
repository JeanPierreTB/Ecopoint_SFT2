import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import Boton from '../Componentes/Boton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Types/types";
import { actualizarfoto } from '../Funciones_Fetch/Usuario/ActualizarFoto';
import { PuntorealizadoQR } from '../Funciones_Fetch/Puntodereciclaje/PuntoRealizadoQR';
import { AgregarNotificacionamigo } from '../Funciones_Fetch/Notificacion/AgregarNotificacionamigo';


type FotoProps = {
    navigation: StackNavigationProp<RootStackParamList, "foto">;
};
  
export default function Foto({ navigation }: FotoProps) {

  const[Camarapermiso,setCamarapermiso]=useState(false);
  const[imagen,setimagen]=useState<string|null >(null);
  const[type,setype]=useState(CameraType.back);
  const cameraRef=useRef<Camera>(null);
  const [escaneoRealizado, setEscaneoRealizado] = useState(false); // Nuevo estado para controlar si se ha realizado un escaneo



  useEffect(() => {
    (async () => {
        await MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setCamarapermiso(cameraStatus.status === 'granted');
    })();
}, []);

 
const tomarfoto = async () => {
  if (cameraRef) {
      try {
          const data = await cameraRef.current?.takePictureAsync();
          console.log(data);
          if (data) {
              // Guardar la imagen en la biblioteca de medios
              const asset = await MediaLibrary.createAssetAsync(data.uri);
              // Obtener la URI de la imagen guardada
              const assetURI = asset.uri;
              setimagen(assetURI); // Usar la URI de la imagen guardada
              const usuario = await AsyncStorage.getItem('usuario');
              const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
              if (assetURI) {
                  // Actualizar la foto del usuario con la URI de la imagen guardada
                  //Usuario.actualizarfoto(usuarioObjeto, assetURI);
                  actualizarfoto(usuarioObjeto,assetURI);
                  alert('Foto actualizada');
                  navigation.navigate("cuenta")
              }
          }
      } catch(e) {
          console.log(e);
      }
  }
};



  if(Camarapermiso===false){
    return <Text>No hay acceso a la camara</Text>
  }

  /*const fabricapunto = (tipo: string, punto: any): APuntodeReciclaje | null => {
    let tipopunto = null;
    switch (tipo) {
        case "Papel":
            tipopunto = new PRPapelFactory();
            break;
        case "Plástico":
            tipopunto = new PRPlasticoFactory();
            break;
        case "Metal":
            tipopunto = new PRMetalFactory();
            break;
        case "Baterias":
            tipopunto = new PRBateriasFactory();
            break;
        case "Ropa":
            tipopunto = new PRRopaFactory();
            break;
    }

    return tipopunto !== null ? tipopunto.crearpuntoderecilaje(punto.id, punto.latitud, punto.longitud, punto.lugar) : null;
}*/


  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (!escaneoRealizado) { // Verificar si ya se ha realizado un escaneo
      alert(`Código ${type} escaneado: ${data}`);
      setEscaneoRealizado(true);
      const parsedData=JSON.parse(data);
      const lugarseleccionado = await AsyncStorage.getItem('recorridoData');
      const lugarseleccionadodata = lugarseleccionado? JSON.parse(lugarseleccionado):null;
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario? JSON.parse(usuario):null;
      const datos = await AsyncStorage.getItem('datos');
      const usuarioObjeto1 = datos? JSON.parse(datos):null;
      //const punto=fabricapunto(parsedData.tipo,parsedData);
      //const res=await punto!.puntorealizadoqr(lugarseleccionadodata.puntoqr,lugarseleccionadodata.cantidad,usuarioObjeto);
      const res=await PuntorealizadoQR(lugarseleccionadodata.puntoqr,parsedData.latitud,parsedData.longitud,parsedData.lugar,parsedData.tipo,lugarseleccionadodata.cantidad,usuarioObjeto)
      console.log("Mensaje:"+res.data.lugar);
      alert(res.mensaje);
      await AgregarNotificacionamigo(usuarioObjeto,`Reciclado en ${res.data.lugar}`,0,usuarioObjeto1.nombre,usuarioObjeto1.foto);
      navigation.navigate("principal")

    }
  };


  return (
    <View style={styles.container}>
      
      <Camera
      style={styles.camera}
      type={type}
      ref={cameraRef}
      onBarCodeScanned={handleBarCodeScanned}
    >
    <Text>Hello</Text>
    </Camera>

      <View>
        <Boton title='Tomar una foto'icon='camera' onpress={tomarfoto}></Boton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000',
    justifyContent:'center',
    paddingBottom:20
  },
  camera:{
    flex:1,
    borderRadius:20
  }
});
