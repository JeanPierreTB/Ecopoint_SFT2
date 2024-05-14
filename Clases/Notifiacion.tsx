class Notifiacion{
    private des:string
    private tipo:number
    private nombre:string
    private foto:string

    constructor(des:string,tipo:number,nombre:string,foto:string){
        this.des=des,
        this.tipo=tipo,
        this.nombre=nombre,
        this.foto=foto
    }

    async agregarnotifiacionamigo(idf:number):Promise<any>{
        try{
            const response=await fetch('http://192.168.0.179:3001/noti-agregar-amigo',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   idamigo:idf,
                   des:this.des,
                   tipo:this.tipo,
                   nombre:this.nombre,
                   foto:this.foto

                   
                }),
            })

            const data=await response.json();
            console.log(data);
            return data
        }catch(e){
            console.error('Ocurrio un error',e)
        }
    }

    static async vernotificaciones(id:number):Promise<any>{
        try{
            const response=await fetch('http://192.168.0.179:3001/ver-notifiaciones',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id     
                }),
            })

            const data=await response.json();
            console.log(data.noti);
            return data.noti
        }catch(e){
            console.error('Ocurrio un error',e)
        }
    }


    
}

export default Notifiacion;