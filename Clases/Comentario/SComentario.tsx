import AComentario from "./AComentario";

class SComentario extends AComentario{
    constructor(des:string){
        super(des);
    }

    async agregarComentario(id: number): Promise<boolean> {
        console.log("Sugerencia de soporte factory creado...")
        try{
            const response=await fetch("http://192.168.0.179:3001/realizar-comentario",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    des:this.getdes(),
                    tipo:3
                })
            })
            if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data=await response.json()
            return data.res
        }catch(e){
           
            console.error("Error",e)
            return false;
        }
    }
}

export default SComentario;