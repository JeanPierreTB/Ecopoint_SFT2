import { URL2 } from "../../URL/URL";
export async function VisualizarPuntos(){
    try {
        const response = await fetch(`${URL2}obtener-puntos`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        //console.log("de la clase:", data.puntos);
        return data.data;
      } catch (error) {
        console.error("Ocurrió un error ", error);
        return [];
      }
}