import { URL2 } from "../../URL/URL";
export async function RecuperarComentarios(){
    try {
        const response = await fetch(`${URL2}obtener-comentarios`);
        if (!response.ok) throw new Error('HTTP error');
        const data = await response.json();
        return data.data;
    } catch (e) {
        console.error('Ocurrió un error', e);
        return [];
    }
}