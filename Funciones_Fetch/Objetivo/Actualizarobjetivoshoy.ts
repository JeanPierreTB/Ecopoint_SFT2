import { URL2 } from "../../URL/URL";

export async function Actualizarobjetivoshoy(id:number) {
    try{
        const diaactual = new Date().getDay() || 7;

        const response=await fetch(`${URL2}avance-objetivos-${diaactual}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id:id
               
            }),
        })

        const data=await response.json();
        console.log("avance-objetivo:"+data)
        return data;

    }catch(e){
        console.error('Ocurrio un error',e)
    }
}