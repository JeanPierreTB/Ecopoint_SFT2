import { URL2 } from "../../URL/URL";

export async function RecuperarObjetivos(id:number) {
    try{
        const response=await fetch(`${URL2}recuperar-objetivo`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id:id
               
            }),
        })
        if(!response.ok) throw new Error('HTTP error! Status: ${response.status}')
        const data=await response.json();
        return data.data;
    }catch(e){
        console.error("Ocurrió un error ", e);
        return [];
    }
}