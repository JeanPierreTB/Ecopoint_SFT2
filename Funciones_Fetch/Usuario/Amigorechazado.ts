import { URL2 } from "../../URL/URL";

export async function AmigoRechazado(nombre:string,nombre1:string,foto:string,des:string,tipo:number) {
    try{
        const response=await fetch(`${URL2}amigo-rechazado`,{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   nombre:nombre,
                   nombre1:nombre1,
                   foto:foto,
                   des:des,
                   tipo:tipo
                   
                   
                }),
        })

        const data=await response.json();
        console.log("datos no se",data);
        return data.mensaje;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
}