import { URL2 } from "../../URL/URL";
import { Alert } from "react-native";

export async function RealizarPunto(id_usuario:number,id:number,tipo:string,punto:any,navigation:any) {
    try{
        console.log("esto no es una prueba",id_usuario,id);
        await fetch(`${URL2}realizar-punto`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({
            idu:id_usuario,
            id:id,
            tipo:tipo,
            punto:punto
        }),
        })

    .then(response=>response.json())
    .then(data=>{
        if(data.res){
          Alert.alert('Exito', 'Punto registrado ha realizar', [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'principal' }],
                });
              }
            }
          ]);
        }
        else
            Alert.alert('Error','Ocurrio un error en el servidor')
        

    })
    .catch(e=>console.error(`Ocurrio un error ${e}`))
    }catch(e){
        console.error("Ocurrio un error",e)
    }
}