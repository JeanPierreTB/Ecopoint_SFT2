import { URL2 } from "../../URL/URL";

export async function ObtenerRecompesassemanal() {
    const response=await fetch(`${URL2}obtener-recompesa-semanal`);
    const data=await response.json();
    return data.data
}