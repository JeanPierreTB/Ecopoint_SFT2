import { URL2 } from "../../URL/URL";
export async function UltimaRecompesa() {
    const response=await fetch(`${URL2}recuperar-recompesas`)
    const data=await response.json();
    return data.data;
}