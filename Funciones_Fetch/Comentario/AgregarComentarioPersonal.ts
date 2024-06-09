import { URL2 } from "../../URL/URL";

export async function AgregarComentarioPersonal(id_usuario:number,id_amigo:number,des:string,tipo:number) {
    try{
        const response=await fetch(`${URL2}agregar-comentariouau`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id_usuario:id_usuario,
                id_amigo:id_amigo,
                des:des,
                tipo:tipo

            })
        })

        const data=await response.json();
        console.log(data);
        return data;
    }catch(e){
        console.error('Ocurrio un error',e)
    }
}