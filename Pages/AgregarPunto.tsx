import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput,TouchableOpacity} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { AgregarPuntoE } from "../Funciones_Fetch/Puntodereciclaje/AgregarpuntoE";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/types';
import { CategoriasPuntos } from "../Funciones_Fetch/Puntodereciclaje/CategoriasPuntos";

type AgregarPuntoProps = {
  navigation: StackNavigationProp<RootStackParamList, "agregarpunto">;
};

export default function AgregarPunto({ navigation }: AgregarPuntoProps) {


  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState('-'); 
  const [categorias,setcategorias]=useState<any>([]);

  useEffect(() => {
    datospuntos();
    obtenercategorias();
  }, []);

  const datospuntos = async () => {
    const punto = await AsyncStorage.getItem("puntoagregar");
    const puntofinal = punto !== null ? JSON.parse(punto) : { latitude: '', longitude: '', nombre: '' };
    setLatitud(String(puntofinal.latitude)); 
    setLongitud(String(puntofinal.longitude)); 
    setNombre(puntofinal.nombre);
  };

  const obtenercategorias=async()=>{
    const categorias=await CategoriasPuntos();
    setcategorias(categorias);
  }

  const handleclik=async ()=>{
    if(valor==="-"){
      return alert("Seleccione el tipo")
    }
    const res=await AgregarPuntoE(parseFloat(latitud),parseFloat(longitud),nombre,valor);

    if(res){
      alert("Punto agregado con exito!");
      navigation.navigate("principal");
    } 
    else alert("Errror al agregar el punto")
    
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar punto</Text>
      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <Text style={styles.texto}>Latitud</Text>
          <TextInput
            style={styles.input}
            value={latitud}
            editable={false} 
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.texto}>Longitud</Text>
          <TextInput
            style={styles.input}
            value={longitud}
            editable={false} 
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.texto}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            editable={false} 
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.texto}>Tipo de punto</Text>
          
          <Picker
          style={styles.pick}
          selectedValue={valor}
          onValueChange={(itemValue:any, itemIndex:any) =>
            setValor(itemValue)
          }
        >
          <Picker.Item label="-" value="-"/>
          {categorias?.map((categoria:any)=>(
            <Picker.Item key ={categoria.id} label={categoria.tipo} value={categoria.tipo} />
          ))}
         
        </Picker>
          
          
        </View>

            
        <TouchableOpacity style={styles.boton} onPress={()=>handleclik()}>
                <Text style={styles.textob}>Agregar</Text>
        </TouchableOpacity>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    gap: 10
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  texto: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    width: '100%',
    height: 60,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  container2: {
    width: '100%',
    alignItems: 'center',
  },
  pick: {
    width: '100%',
    backgroundColor: 'lightgreen',
    

  },container3:{
    marginTop:20,
    flexDirection:'row',
    gap:50
  },
  textob:{
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'
  },
  boton:{
    marginTop:60,
    backgroundColor:'lightgreen',
    padding:20,
    borderRadius:20,
    width:'80%',
    
    
    
  }
});

