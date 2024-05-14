

class Consejos{
    private des:string;
    private dia:number;

    constructor(des:string,dia:number){
        this.des=des,
        this.dia=dia
    }

    static async recuperarconsejos():Promise<any[]>{
        try{
            const response=await fetch('http://192.168.0.179:3001/recuperar-consejos')
            if(!response.ok) throw new Error('HTTP error! Status: ${response.status}')
            const data=await response.json();
            return data.consejos;

        }catch(e){
            console.error("Ocurrió un error ", e);
            return [];
        }
    }
}

export default Consejos;