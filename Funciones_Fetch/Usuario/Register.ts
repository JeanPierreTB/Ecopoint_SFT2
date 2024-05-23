import { URL2 } from "../../URL/URL";
import { Alert } from "react-native";
export async function Register(nombre:string,contraseña:string|null,Dni:number|null,ntelefono:number|null) {
    
        try {
          const response = await fetch(`${URL2}insertar-usuario`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      nombre: nombre,
                      contrasena: contraseña,
                      dni:Dni,
                      ntelefono: ntelefono
                  }),
              });
  
              const data = await response.json();
  
              if (data.res) {
                  Alert.alert('Éxito', data.mensaje);
              } else {
                  Alert.alert('Error', data.mensaje);
              }
  
              return data.res;
          } catch (error) {
              console.error("Ocurrió un error ", error);
              Alert.alert('Error', 'Ocurrió un error al procesar la solicitud.');
              return false;
          }
      
}