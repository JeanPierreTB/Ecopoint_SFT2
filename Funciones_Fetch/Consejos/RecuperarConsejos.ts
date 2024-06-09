import { URL2 } from "../../URL/URL";

export async function RecuperarConsejos():Promise<any[]> {
    try{
        const response=await fetch(`${URL2}recuperar-consejos`)
        if(!response.ok) throw new Error('HTTP error! Status: ${response.status}')
        const data=await response.json();
        return data.data;

    }catch(e){
        console.error("Ocurrió un error ", e);
        return [];
    }
}
