import { Alert } from "react-native";
import { URL2 } from "../../URL/URL";
export async function changepassword(nombre:string,contranueva:string,navigation:any){
    await fetch(`${URL2}cambio_contra`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nombre: nombre,
        contrasena: contranueva,
    }),
    })

    .then(response=>response.json())
    .then(data=>{
        if(data.res){
            Alert.alert('Exito','Contraseña cambiada exitosamente');
            navigation.navigate('sesion');
        }
        else
            Alert.alert('Error','Correo no encontrado')

    })
    .catch(e=>console.error(`Ocurrio un error ${e}`))
}