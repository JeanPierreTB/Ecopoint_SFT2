import Comentario from "./Comentario";
class ComentarioFactory {
    static crearComentario(des: string, tipo: number): Comentario {
        return new Comentario(des, tipo);
    }
}

export default ComentarioFactory;