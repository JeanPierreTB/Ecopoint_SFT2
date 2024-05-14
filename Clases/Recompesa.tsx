class Recompesa{
    private imagen:string;
    private des:string;
    private fechai:Date;
    private fechaf:Date;
    private puntaje:number

    constructor(imagen:string,des:string,fechai:Date,fechaf:Date,puntaje:number){
        this.imagen=imagen,
        this.des=des,
        this.fechai=fechai,
        this.fechaf=fechaf,
        this.puntaje=puntaje

    }

    static async obtenerrecompesasemanal():Promise<any>{
        const response=await fetch('http://192.168.0.179:3001/obtener-recompesa-semanal');
        const data=await response.json();
        return data.recompensa
    }

    async agregarrecompesa():Promise<any>{
        const response=await fetch('http://192.168.0.179:3001/agregar-recompesa',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   imagen:this.imagen,
                   des:this.des,
                   fechainicio:this.fechai,
                   fechafin:this.fechaf,
                   puntaje:this.puntaje
                   
                }),
        })

        const data=await response.json();
        return data;
    }

    static async obtenerganador(id:number):Promise<any>{
        const response=await fetch('http://192.168.0.179:3001/verificar-recompensa',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id:id
                   
                }),
        })

        const data=await response.json();
        return data;
    }
}

export default Recompesa;