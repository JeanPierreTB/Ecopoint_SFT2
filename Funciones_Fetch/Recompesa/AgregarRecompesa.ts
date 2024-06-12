import { URL2 } from "../../URL/URL";
export async function AgregarRecompesa(imagen:string|null,des:string,fechainicio:string,fechafin:string,puntaje:number) {
    const response=await fetch(`${URL2}agregar-recompesa`,{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               imagen:imagen,
               des:des,
               fechainicio:fechainicio,
               fechafin:fechafin,
               puntaje:puntaje
               
            }),
    })

    const data=await response.json();
    return data.res;
}