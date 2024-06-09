import { URL2 } from "../../URL/URL";

export async function ObtenerGanador(id:number) {
    const response=await fetch(`${URL2}verificar-recompensa`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id
                   
                }),
        })

        const data=await response.json();
        return data;
}