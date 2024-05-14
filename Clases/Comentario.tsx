class Comentario{
    private des:string;
    private tipo:number
    constructor(des:string,tipo:number){
        this.des=des,
        this.tipo=tipo
    }

    async agregarcomentario(id:number):Promise<boolean>{
        try{
            const response=await fetch("http://192.168.0.179:3001/realizar-comentario",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    des:this.des,
                    tipo:this.tipo
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

    static async recuperarcomentarios():Promise<any[]>{
        try{
            const response=await fetch('http://192.168.0.179:3001/obtener-comentarios')
            if(!response.ok) throw new Error('HTTP error')
            const data=await response.json();
            return data.comentarios
        }catch(e){
            console.error('Ocurrio un error',e)
            return [];
        }
    }

    async agregarcomentariopersonal(id_usuario:number,id_amigo:number):Promise<any>{
        try{
            const response=await fetch('http://192.168.0.179:3001/agregar-comentariouau',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id_usuario:id_usuario,
                    id_amigo:id_amigo,
                    des:this.des,
                    tipo:this.tipo

                })
            })

            const data=await response.json();
            console.log(data);
            return data;
        }catch(e){
            console.error('Ocurrio un error',e)
        }
    }

    static async recuperarchatusuario(id_usuario:number,id_amigo:number):Promise<any>{
        try{
            const respone=await fetch('http://192.168.0.179:3001/recuperar-comentariouau',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id_usuario:id_usuario,
                    id_amigo:id_amigo
                })
            })

            const data=await respone.json();
            console.log(data.comentarios);
            return data.comentarios;
        }catch(e){
            console.error("Ocurrio un error",e)
        }
    }
}


export default Comentario;