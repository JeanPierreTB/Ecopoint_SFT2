import { URL2 } from "../../URL/URL";

export async function RecuperarChatUsuario(id_usuario:number,id_amigo:number) {
    try{
        const respone=await fetch(`${URL2}recuperar-comentariouau`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id_usuario:id_usuario,
                id_amigo:id_amigo
            })
        })

        const data=await respone.json();
        return data.data;
    }catch(e){
        console.error("Ocurrio un error",e)
    }
}