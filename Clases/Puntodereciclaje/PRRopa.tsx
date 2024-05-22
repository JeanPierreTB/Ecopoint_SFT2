import APuntodeReciclaje from "./APuntodeReciclaje";
import { Alert } from "react-native";
import { URL2 } from "../../URL/URL";

class PRRopa extends APuntodeReciclaje{
    constructor(id:number=0,latitud:number,longitud:number,lugar:string){
        super(id,latitud,longitud,lugar)
    }

    async realizarpunto(id_usuario: number, id: number, navigation: any): Promise<void> {
        console.log("Punto de ropa creado....")

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
                tipo:"Ropa"
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

}

export default PRRopa;