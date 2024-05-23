import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TransaccionProps } from '../Types/types';
import APuntodeReciclaje from '../Clases/Puntodereciclaje/APuntodeReciclaje';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native";
import Usuario from '../Clases/Usuario_Vista/Usuario';



const Transaccion: React.FC<any> = ({ navigation }:TransaccionProps) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [transacciones, setTransacciones] = useState<any[] | null>([]);
  const [selectedPuntaje, setSelectedPuntaje] = useState('');
  const [cantidad,setcantidad]=useState('0');
  
  

  const handlePickerChange = (itemValue: string) => {
    const selectedTransaccion = transacciones?.find((transaccion) => transaccion.lugar === itemValue);
    setSelectedOption(itemValue);
    setSelectedPuntaje(selectedTransaccion?.tipo || '');
  };

  const recuperarTransaccion = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
        const usuarioObjeto = usuario ? JSON.parse(usuario) : null;
        const usuarioData = await Usuario.datosusuario(usuarioObjeto);
      const puntos = await APuntodeReciclaje.obtenerpuntosarelizar(usuarioData.id);
      puntos ? setTransacciones(puntos) : null;
    } catch (e) {
      alert('Ocurrio un error');
    }
  }

  useEffect(() => {
    recuperarTransaccion();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      recuperarTransaccion();
      setSelectedPuntaje('');
    }, [])
  );

  const handlecancelar = async () => {
    try {
      console.log(selectedOption);
      const usuario = await AsyncStorage.getItem('usuario');
      const usuarioObjeto = usuario? JSON.parse(usuario):null;
      console.log("id",usuarioObjeto);
      const data = await APuntodeReciclaje.puntorealizado(selectedOption,usuarioObjeto);
      if (data) {
        const nuevaLista = transacciones?.filter(transaccion => transaccion.id !== data.punto?.id);
        setTransacciones(nuevaLista || []);
      }
      setSelectedPuntaje("");
      alert(data.mensaje);
    } catch (e) {
      alert("Ocurrió un error");
    }
  };
  

  const gofoto = async () => {
    try {
      // Crear un objeto JSON con los valores
      const dataToSave = {
        puntoqr: selectedOption,
        selectedPuntaje: selectedPuntaje,
        cantidad: cantidad
      };

      // Convertir el objeto a una cadena JSON
      const jsonData = JSON.stringify(dataToSave);

      // Guardar la cadena JSON en AsyncStorage
      await AsyncStorage.setItem('recorridoData', jsonData);
      setcantidad('0');
      navigation.navigate("foto");
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  }
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizacion de transacciones</Text>

      <View style={styles.container3}>
        <View>
          <Text style={styles.des}>Lugar</Text>
          <Picker
            style={styles.pick}
            selectedValue={selectedOption}
            onValueChange={handlePickerChange}
            
          >
            <Picker.Item
                label='-'
                value="-"
                style={styles.picker}
            />
            {transacciones?.map((transaccion) => (
              <Picker.Item
                key={transaccion.id}
                label={transaccion.lugar}
                value={transaccion.lugar}
                style={styles.picker}
                
              />
            ))}
          </Picker>
        </View>

        <View>
          <Text style={styles.des}>Tipo</Text>
          <TextInput value={selectedPuntaje} style={styles.input} />
        </View>
        <View>
        <Text style={styles.des}>Cantidad</Text>
        
         <TextInput style={styles.input} keyboardType="numeric" value={cantidad} onChange={(e)=>setcantidad(e.nativeEvent.text)}/>

      </View> 

      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.boton} onPress={()=>handlecancelar()}>
          <Text style={styles.texto}>Cancelacion de reciclaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={() =>gofoto()}>
          <Text style={styles.texto}>Reclamar puntos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
    margin: 40,
  },
  des: {
    width: 200,
    fontSize: 20,
  },
  pick: {
    width: '100%',
    backgroundColor: 'lightgreen',
  },
  input: {
    backgroundColor: 'lightgreen',
    width: '100%',
    height: 30,
    textAlign: 'center',
  },
  boton: {
    margin: 20,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
    width: 120,
  },
  container2: {
    flexDirection: 'row',
    marginTop: 40,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  container3: {
    gap: 20,
    width: '70%',
  },
  picker: {
    fontSize: 15,
  }
});

export default Transaccion;