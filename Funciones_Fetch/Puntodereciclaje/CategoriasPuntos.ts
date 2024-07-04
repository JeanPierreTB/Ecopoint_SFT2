import { URL2 } from "../../URL/URL";
export async function CategoriasPuntos() :Promise<any>{
    try{
        const response = await fetch(`${URL2}obtener-categorias`)
          const data = await response.json();
          return data.data; 
    }catch(e){
        console.error("Ocurrió un error", e);

    }
}