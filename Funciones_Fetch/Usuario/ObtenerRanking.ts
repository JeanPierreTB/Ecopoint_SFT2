import { URL2 } from "../../URL/URL";

export async function ObtenerRanking() {
    try{
        const response=await fetch(`${URL2}rankings-usuarios`)
        const data=await response.json();
        console.log(data.usuarios);
        return data.data;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
}