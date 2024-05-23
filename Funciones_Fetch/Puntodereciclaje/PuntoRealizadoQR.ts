import { URL2 } from "../../URL/URL";
export async function PuntorealizadoQR(lugarseleccionado:string,latitud:number,longitud:number,lugar:string,tipo:string,cantidad:number,id:number){
    try{
        const response=await fetch(`${URL2}punto-cancelado-qr`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              lugarseleccionado:lugarseleccionado,
              latitud:latitud,
              longitud:longitud,
              lugar:lugar,
              tipo:tipo,
              cantidad:cantidad,
              id:id
          }),
        })

        const data=await response.json();
        console.log(data);
        return data;
      }catch(e){
        console.log("Ocurrio un error",e)
      }
}