import { URL2 } from "../../URL/URL";
export async function DatosInformativos(id:number) {
    try{
        const response = await fetch(`${URL2}notas-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id
                }),
            });
         const data=await response.json();
         
         return data
          
      }catch(e){
        console.error("Ocurrio un error",e)
      }
}