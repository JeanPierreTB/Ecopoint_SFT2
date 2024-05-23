import { URL2 } from "../../URL/URL";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function islogin(nombre:string,contraseña:string,navigation:any){
    try {
        console.log("Entro aqui final..")
        const response = await fetch(`${URL2}verificar-usuario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: nombre,
            contrasena: contraseña,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.res) {
          // Almacena información de sesión segura en AsyncStorage
          console.log(data.data.id);
          const userData=data.data.id;
          //const userData = { nombre: this.nombre,contraseña:this.contraseña };
          AsyncStorage.setItem('usuario', JSON.stringify(userData));
          navigation.navigate('principal');
        } else {
          Alert.alert('Error', data.mensaje);
        }
      } catch (error) {
        console.error('Error:', error);
        // Manejo de errores
        Alert.alert('Error', 'Ocurrió un error al procesar la solicitud.');
      }
}