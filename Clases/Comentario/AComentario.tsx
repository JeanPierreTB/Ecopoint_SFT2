abstract class AComentario {
    private des:string;
 
    constructor(des:string){
        this.des=des
    }


    
    getdes():string{
        return this.des;
    }
    static async recuperarComentarios(): Promise<any[]> {
        try {
            const response = await fetch('http://192.168.0.179:3001/obtener-comentarios');
            if (!response.ok) throw new Error('HTTP error');
            const data = await response.json();
            return data.comentarios;
        } catch (e) {
            console.error('Ocurrió un error', e);
            return [];
        }
    }

    abstract agregarComentario(id: number): Promise<boolean>;

}

export default AComentario;
