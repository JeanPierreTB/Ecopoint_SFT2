import { URL2 } from "../../URL/URL";

abstract class APuntodeReciclaje {
    public latitud:number;
    public longitud:number;
    public lugar:string;
    public id:number;

 
    constructor(id:number=0,latitud:number,longitud:number,lugar:string){
        this.latitud=latitud;
        this.longitud=longitud;
        this.lugar=lugar;
        this.id=id;
    }
    
    static async visualizarpuntos(): Promise<any[]> {
        try {
          const response = await fetch(`${URL2}obtener-puntos`);
          
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
      static async obtenerpuntosarelizar(usuario:number): Promise<any[]> {
        try {
          console.log("esto es de la clase"+usuario);
          const response = await fetch(`${URL2}obtener-punto-realizar`, {
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

      abstract realizarpunto(id_usuario:number,id:number,navigation:any): Promise<void>;



    
    
    


}

export default APuntodeReciclaje;
