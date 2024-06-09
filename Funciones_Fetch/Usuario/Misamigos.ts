import { URL2 } from "../../URL/URL";

export async function MisamigosF(id:number) {
    try{
        const response=await fetch(`${URL2}misamigos`,{
          method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id    
                   
                }),
        })

        const data=response.json();
        console.log(data);
        return data;


      }catch(e){
        console.error("Ocurrio un error",e)
      }
}