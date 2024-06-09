import { URL2 } from "../../URL/URL";

export async function AgregarAmigosF(id_usuario:number,nombre:string,nombre1:string,foto:string,des:string,tipo:number) {
    try{
        const response=await fetch(`${URL2}agregar-amigos`,{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   idusuario:id_usuario,
                   nombre:nombre,
                   nombre1:nombre1,
                   foto:foto,
                   des:des,
                   tipo:tipo
                   
                   
                }),
        })

        const data=await response.json();
        console.log(data.mensaje)
        return data.mensaje;
      }catch(e){
        console.error("Ocurrio un error",e)
      }
}