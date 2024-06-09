import { URL2 } from "../../URL/URL";

export async function AgregarNotificacionamigo(idf:number,des:string,tipo:number,nombre:string,foto:string) {
    try{
        const response=await fetch(`${URL2}noti-agregar-amigo`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               idamigo:idf,
               des:des,
               tipo:tipo,
               nombre:nombre,
               foto:foto

               
            }),
        })

        const data=await response.json();
        console.log(data);
        return data
    }catch(e){
        console.error('Ocurrio un error',e)
    }
}