import { URL2 } from "../../URL/URL";

export async function ObtenernoAmigos(id:number) {
    try{
        const response=await fetch(`${URL2}todos-sin-amigos`,{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id,
                   
                }),
        })
        const data=await response.json();
        return data.data;

      }catch(e){
        console.error("Ocurrio un error",e)
      }
}