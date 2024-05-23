import { URL2 } from "../../URL/URL";
export async function actualizarfoto(id:number,foto:string) {
    const response=await fetch(`${URL2}actualizar-foto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id:id,
            foto:foto
        }),
    });

    const data=await response.json();
    return data
}