import { URL2 } from "../../URL/URL";
export async function Obtenerpuntosrealizar(usuario:number){
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
    
        return data.data || []; 
    
      } catch (e) {
        console.error("Ocurrió un error", e);
        return [];
      }
}