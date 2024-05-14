import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ComunidadProps } from "../Types/types";
import CajaComunidad from "../Componentes/CajaComunidad";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comentario from "../Clases/Comentario";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import Usuario from "../Clases/Usuario";

const opciones = [
  {
    numero: "0",
    des: "-",
  },
  {
    numero: "1",
    des: "soporte",
  },
  {
    numero: "2",
    des: "comentario",
  },
  {
    numero: "3",
    des: "sugerencia",
  },
  /*'0',//-
    '1',//soporte
    '2',//comentario
    '3'//sugerencia*/
];

const Comunidad: React.FC<any> = ({ navigation }: ComunidadProps) => {
  const [selectedOption, setSelectedOption] = useState("0");
  const [texto, settexto] = useState("");
  const [comentarios, setcometarios] = useState<any[]>([]);
  const [datos,setdatos]=useState<any>(null);
  const textInputRef = useRef<TextInput>(null);
  

  useEffect(() => {
    mostrarcomentario();
    datosusuario();
  }, []);

  const mostrarcomentario = async () => {
    try {
      const allcoment = await Comentario.recuperarcomentarios();
      setcometarios(allcoment);
    } catch (e) {
      console.log("Ocurrio un error", e);
    }
  };

  const datosusuario=async ()=>{
    try{
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario? JSON.parse(usuario):null;
      const usuario1=await Usuario.datosusuario(usuarioObjeto);
      setdatos(usuario1);
    }catch(e){
      console.log('Ocurrio un error',e)
    }
  }
  const handlePickerChange = (itemValue: string) => {
    console.log("Numero" + itemValue);
    setSelectedOption(itemValue);
  };

  const handleclik = async () => {
    try {
      if (selectedOption === "0") {
        return alert("Selecciona un tipo de comentario");
      }
      const usuario = await AsyncStorage.getItem("usuario");
      const usuariobjeto = usuario ? JSON.parse(usuario) : null;
      console.log(texto);
      const coment = new Comentario(texto, parseInt(selectedOption));
      await coment.agregarcomentario(usuariobjeto); 
      await mostrarcomentario(); 
      textInputRef.current?.clear();
      alert("Comentario agregado");
    } catch (e) {
      console.error("Error al recuperar el usuario");
    }
  };

  return (
    <View style={styles.container2}>
      <View style={styles.comunidad}>
        <Text style={styles.titulo}>Comunidad</Text>
        {datos && datos.foto && (
            <Image
              style={styles.imagen}
              source={{
                uri: datos.foto
              }}
            />
          )}
      </View>
      
        <ScrollView style={styles.container4}>
            <View style={styles.container}>
            {comentarios && comentarios.length > 0 ? (
            comentarios.map((comentario) => (
              <CajaComunidad
                key={comentario.id}
                nombre={comentario.Usuario.nombre}
                foto= {comentario.Usuario?.foto}
                com={comentario.des}
                tipo={comentario.tipo}
              />
            ))
          ) : (
            <Text style={styles.texto}>Comentarios de hoy</Text>
          )}
            </View>
          
        </ScrollView>
      

      <View style={styles.container3}>
        <TextInput
          style={styles.textoinput}
          ref={textInputRef}
          multiline={true}
          numberOfLines={4}
          onChangeText={(e) => settexto(e)}
        ></TextInput>

        <TouchableOpacity style={styles.boton}>
          <Icon
            name="arrow-right"
            size={30}
            color="green"
            onPress={() => handleclik()}
          />
        </TouchableOpacity>

        <View style={[styles.pickContainer,selectedOption==="0"? styles.orange:selectedOption==="1"? styles.rojo:selectedOption==="2"? styles.gris:styles.verde ]}>
          <Picker
            style={styles.pick}
            selectedValue={selectedOption}
            onValueChange={handlePickerChange}
          >
            {opciones.map((opcion, index) => (
              <Picker.Item
                key={index}
                label={`${opcion.numero}:${opcion.des}`}
                value={opcion.numero}
                style={styles.picker}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    marginTop:5,
    justifyContent: "space-between",
  },
  titulo: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
  comunidad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  texto: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  container3: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    gap: 10,
  },
  textoinput: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    width: "65%",
    height: 60,
    textAlign: "center",
    textAlignVertical: "top",
    padding: 10,
  },

  pickContainer: {
    
    width: "27%",
    height: "80%",
    //backgroundColor: "green",
    borderRadius: 20,
    overflow: "hidden", 
  },
  pick: {
    width: "100%",
  },
  picker: {
    fontSize: 12,
    color: "black",
  },
  boton: {
    position: "absolute",
    end: 140,
    top: 15,
  },
  rojo:{
    backgroundColor:'red',
  },
  gris:{
    backgroundColor:'gray'
  },
  verde:{
    backgroundColor:'green'
  },
  orange:{
    backgroundColor:"orange"
  },
  container:{
    marginTop:40,
    alignItems:'center',
    justifyContent:'center',
    gap:20
    
    
  },
  container4:{

    marginBottom:10,
   
    
  }
});

export default Comunidad;
