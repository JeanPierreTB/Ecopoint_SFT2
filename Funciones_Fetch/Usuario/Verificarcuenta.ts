import { URL2 } from "../../URL/URL";
export async function verificarcuenta(nombre:string){
    const response = await fetch(`${URL2}usuario-existente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre
        }),
      });

      const data=await response.json();
      return data.res;
}