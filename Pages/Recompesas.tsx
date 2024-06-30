// Recompesas.tsx
import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView,TextInput,Button } from 'react-native';
import { RecompensasProps } from '../Types/types';
import CajaObjetivo from '../Componentes/CajaObjetivo';
import { RecuperarObjetivos } from '../Funciones_Fetch/Objetivo/RecuperarObjetivos';
import { ObtenerRecompesassemanal } from '../Funciones_Fetch/Recompesa/ObtenereRecompesasemanal';
import { Actualizarobjetivoshoy } from '../Funciones_Fetch/Objetivo/Actualizarobjetivoshoy';
import { ObtenerGanador } from '../Funciones_Fetch/Recompesa/Obtenerganador';
import { DatosUsuario } from '../Funciones_Fetch/Usuario/DatosUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AgregarNotificacionamigo } from '../Funciones_Fetch/Notificacion/AgregarNotificacionamigo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary, Asset, ImageLibraryOptions } from 'react-native-image-picker';
import { AgregarRecompesa } from '../Funciones_Fetch/Recompesa/AgregarRecompesa';
import { UltimaRecompesa } from '../Funciones_Fetch/Recompesa/UltimaRecompesa';


const Recompesas: React.FC<any> = ({ navigation }:RecompensasProps) => {
  
  const[objetivos,setobjetivos]=useState<any[]>([]);
  const[recompesasem,setrecompesasem]=useState<any>();
  const[mensaje,setmensaje]=useState("");
  const[rol,setrol]=useState("");
  const[descripcion,setdescripcion]=useState("");
  const[puntaje,setpuntaje]=useState("");
  const [fechainicio, setFechaInicio] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);



  useEffect(()=>{
    obtenerfecha();
    obtenerecompesa();

    
    if(rol==="Cliente") recuperarobjetivos();
    
    actualizarobjetivos();
    obtenerganador();
  },[]);


  const obtenerfecha=async ()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const usuario1=await DatosUsuario(usuarioObjeto);
    setrol(usuario1.rol)
    const resultado=await UltimaRecompesa();
    const fechaInicioObtenida = new Date(resultado);
    setFechaInicio(fechaInicioObtenida);


  }

  const recuperarobjetivos=async ()=>{
    try{
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario? JSON.parse(usuario):null;
      const allobjetivos:any=await RecuperarObjetivos(usuarioObjeto);
      console.log(allobjetivos);
      setobjetivos(allobjetivos);
    }catch(e){
      console.log('Ocurrio un error',e)
    }
  }

  const obtenerecompesa=async()=>{
    const recompesasemanal=await ObtenerRecompesassemanal();
    setrecompesasem(recompesasemanal);
  }

  const actualizarobjetivos=async()=>{

    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const usuario1=await DatosUsuario(usuarioObjeto);
    setrol(usuario1.rol)
    console.log("Final:"+usuario1.rol);
    const objetivosactualizados=await Actualizarobjetivoshoy(usuarioObjeto);
    if(objetivosactualizados.res){
      recuperarobjetivos();
    }

  }


  const obtenerganador=async()=>{
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioObjeto = usuario? JSON.parse(usuario):null;
    const datos = await AsyncStorage.getItem('datos');
    const usuarioObjeto1 = datos? JSON.parse(datos):null;
    const ganador=await ObtenerGanador(usuarioObjeto);
    if(ganador.res){
      await AgregarNotificacionamigo(usuarioObjeto,'Usted ha ganado el premio de la semana',0,usuarioObjeto1.nombre,usuarioObjeto1.foto)
      setmensaje(ganador.mensaje)
    }
    
    
  }

  const formatDate = (date:Date) => {
    return date.toISOString().split('T')[0]; 
  };

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
        } else {
          setImageUri(null);
        }
      }
    });
  };

  const handleclik= async ()=>{
    console.log("Descripcion: " + descripcion);

  
  const fechaInicio = new Date(fechainicio);

  const fechaFin = new Date(fechaInicio);
  fechaFin.setDate(fechaFin.getDate() + 6);

  const formattedFechaInicio = `${fechaInicio.getFullYear()}/${fechaInicio.getMonth() + 1}/${fechaInicio.getDate()}`;
  const formattedFechaFin = `${fechaFin.getFullYear()}/${fechaFin.getMonth() + 1}/${fechaFin.getDate()}`;

  console.log("Fecha inicio: " + formattedFechaInicio);
  console.log("Fecha fin: " + formattedFechaFin);
  console.log("Puntaje: " + puntaje);
  console.log("Imagen: " + imageUri);

  const res=await AgregarRecompesa(imageUri,descripcion,formattedFechaInicio,formattedFechaFin,parseInt(puntaje));
  if(res){
    alert("Recompesa agregada con exito");
    setImageUri(null);
    setpuntaje("");
    setFechaInicio(new Date());
    setdescripcion("");
  }

  else if(!res){
    alert("Recompesa no agregada")
  }

  obtenerfecha();
  

  }
  


  return (
    rol === 'Cliente' ? (
      <View style={styles.recompesa}>
        {recompesasem === null ? (
          <Text>Recompensa no disponible</Text>
        ) : (
          <View style={styles.container}>
            <Text style={styles.texto}>Recompensa en: {recompesasem?.puntaje} puntos</Text>
            {recompesasem?.imagen ? (
              <Image
                style={styles.imagen}
                source={{ uri: recompesasem.imagen }}
              />
            ) : (
              <Text style={styles.texto}>Imagen no disponible</Text>
            )}
            <Text style={styles.texto}>{mensaje === "" ? recompesasem?.des : mensaje}</Text>
          </View>
        )}
        <Text style={styles.titulo}>Objetivos</Text>
        <ScrollView>
          {objetivos?.map(objetivo => (
            <CajaObjetivo key={objetivo.id} titulo={objetivo.des} recompesa={objetivo.puntos} porcentaje={objetivo.usuarios[0]?.Objetivo_Usuario?.porcentaje} />
          ))}
        </ScrollView>
      </View>
    ) : (
      <View style={styles.containera}>
          <Text style={styles.titulob}>Agregar Recompesa</Text>
          <View style={styles.inputs}>
          <View>
                <Text style={styles.textoboton}>Descripcion</Text>
                <TextInput style={styles.boton} value={descripcion} onChange={(e)=>setdescripcion(e.nativeEvent.text)}/>
            </View>
            <View>
                <Text style={styles.textoboton}>Fecha de inicio</Text>
                <TouchableOpacity style={styles.botonf} disabled={true} onPress={() => setOpenInicio(true)}>
                  <Text style={styles.textoboton2}>{formatDate(fechainicio)}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                
                  open={openInicio}
                  date={fechainicio}
                  mode="date"
                  onConfirm={(date) => {
                    setOpenInicio(false);
                    setFechaInicio(date);
                  }}
                  onCancel={() => {
                    setOpenInicio(false);
                  }}
            />
            </View>
            
            <View>
                <Text style={styles.textoboton}>Puntaje</Text>
                <TextInput style={styles.boton} value={puntaje} onChange={(e)=>setpuntaje(e.nativeEvent.text)}/>

            </View>

            <View>
                <Text style={styles.textoboton}>Imagen</Text>
                <TouchableOpacity style={styles.boton2} onPress={handleChoosePhoto}>
                  <Text style={styles.textob}>Seleccionar imagen</Text>
                </TouchableOpacity>
                {imageUri && (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.imagenSeleccionada}
                  />
                )}
            </View>
            <TouchableOpacity style={[styles.boton2,{marginTop:80}]} onPress={()=>handleclik()} >
              <Text style={styles.textob}>Agregar Recompesa</Text>
            </TouchableOpacity>
          </View>
            




      </View>
    )
  );
}

const styles=StyleSheet.create({
  recompesa:{
    flex:1,
    marginTop:40
  },
  container:{
    alignItems:'center',
    gap:10,
  },
  imagen:{
    width:150,
    height:150,
    borderRadius:20
  },
  texto:{
    fontSize:15,
    fontWeight:'bold'
  },
  titulo:{
    fontWeight:'bold',
    fontSize:20,
  },boton:{
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
    titulob:{
      fontWeight:'bold',
      fontSize:30,
    },
    containera:{
      flex:1,
      marginTop:40,
      alignItems:'center',
      gap:20

    },
    inputs:{
      gap:30
    },
    boton2: {
      backgroundColor: 'lightgreen',
      width: '100%',
      padding: 10,
      borderRadius: 20,
      height:60,
      
    },
    textob: {
      textAlign: 'center',
      marginTop: 10,
      color: 'green'
    },
    botonf:{
      borderWidth:1,
      borderColor:'black',
      borderRadius:10,
      padding:10
    },
    textoboton2:{
      fontSize:20,
      textAlign:'center'

    },
    imagenSeleccionada: {
      width: 60,
      height: 60,
      borderRadius: 10,
      marginTop: 10,
    }

})



export default Recompesas;