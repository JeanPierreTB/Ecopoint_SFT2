import { URL2 } from "../../URL/URL";
export async function AgregarCategoriaF(tipo:string,valor:number) {
    try{
        const response = await fetch(`${URL2}agregar-categoria`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                tipo:tipo,
                valor:valor
            }),
            })
          const data = await response.json();
      
          return data.res; 
    }catch(e){
        console.error("Ocurrió un error", e);

    }
}