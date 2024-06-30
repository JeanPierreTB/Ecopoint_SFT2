import { URL2 } from "../../URL/URL";
export async function AprobarComentario(com:string) {
    try{
        const response=await fetch(`${URL2}aprobar-comentario`,{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   com:com    
                }),
        })

        const data=await response.json();
        console.log("datos no se",data);
        alert("Mensaje:"+data.mensaje);
        return data.res;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
}