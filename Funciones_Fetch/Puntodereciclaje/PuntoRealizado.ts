import { URL2 } from "../../URL/URL";
export async function PuntoRealizado(lugar:string,id:number) {
    try {
        const response = await fetch(`${URL2}punto-cancelado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lugar:lugar,
                id:id
            }),
        });

        const data = await response.json();

        return {
            mensaje: data.mensaje || "Mensaje predeterminado",
            res: data.res || false,
            punto: data.data || null
        };

    } catch (e) {
        console.error("Ocurrió un error", e);
        return {
            mensaje: "Ocurrió un error",
            res: false,
            punto: null
        };
    }
}