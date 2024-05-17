import { Alert } from 'react-native';



interface Punto_Id{
  id:number;
  PuntoId:number;
  UsuarioId:number
}

interface response{
   mensaje:string,
   res:boolean,
   punto:Punto_Id|null
   
}

class PuntodeReciclaje{
    private latitud:number;
    private longitud:number;
    private lugar:string;
    private id:number;
    private tipo:string;


    constructor(id:number=0,latitud:number,longitud:number,lugar:string,tipo:string){
        this.latitud=latitud;
        this.longitud=longitud;
        this.lugar=lugar;
        this.tipo=tipo;
        this.id=id;
    }


    static async visualizarpuntos(): Promise<any[]> {
        try {
          const response = await fetch('http://192.168.0.179:3001/obtener-puntos');
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          //console.log("de la clase:", data.puntos);
          return data.puntos;
        } catch (error) {
          console.error("Ocurrió un error ", error);
          return [];
        }
      }

      static async realizarpunto(id_usuario:number,id:number,navigation:any):Promise<void>{
        try{
            console.log("esto no es una prueba",id_usuario,id);
            await fetch("http://192.168.0.179:3001/realizar-punto", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                idu:id_usuario,
                id:id
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

      static async obtenerpuntosarelizar(usuario:number): Promise<any[]> {
        try {
          console.log("esto es de la clase"+usuario);
          const response = await fetch('http://192.168.0.179:3001/obtener-punto-realizar', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                usuario:usuario
            }),
            })
          const data = await response.json();
      
          return data.puntos || []; 
      
        } catch (e) {
          console.error("Ocurrió un error", e);
          return [];
        }
      }


    getlugar():string{
        return this.lugar
    }

    gettipo():string{
        return this.tipo
    }

    getid():number{
        return this.id
    }

    getlatitud():number{
        return this.latitud
    }

    getlongitud():number{
        return this.longitud
    }
      


}

export default PuntodeReciclaje;