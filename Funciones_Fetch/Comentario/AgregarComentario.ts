import { URL2 } from "../../URL/URL";
export async function AgregarComentario(id:number,des:string,tipo:number) {
    try{
        const response=await fetch(`${URL2}realizar-comentario`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                des:des,
                tipo:tipo
            })
        })
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data=await response.json()
        return data.res
    }catch(e){
       
        console.error("Error",e)
        return false;
    }
}