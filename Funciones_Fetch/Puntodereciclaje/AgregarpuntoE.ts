import { URL2 } from "../../URL/URL";
export async function AgregarPuntoE(latitud:number,longitud:number,lugar:string,tipo:string) {
    try{
        const response = await fetch(`${URL2}agregar-punto`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                latitud:latitud,
                longitud:longitud,
                lugar:lugar,
                tipo:tipo
            }),
            })
          const data = await response.json();
      
          return data.res; 
    }catch(e){
        console.error("Ocurrió un error", e);

    }
}