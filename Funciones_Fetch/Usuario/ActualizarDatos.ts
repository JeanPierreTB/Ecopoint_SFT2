import { URL2 } from "../../URL/URL";
export async function ActualizarDatos(id:number,nombre:string,contraseña:string,Dni:number,ntelefono:number) {
    try {
        console.log(contraseña);
        const response = await fetch(`${URL2}actualizar-datos-usuario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            nombre: nombre,
            contrasena: contraseña,
            dni: Dni,
            ntelefono: ntelefono
          }),
        });

        const data = await response.json();
        return data;
      } catch (error) {
        
        console.error("Ocurrió un error ", error);
        return false;
      }
}