import AComentario from "./AComentario";
import IcomentarioFactory from "./IComentarioFactory";
import SComentario from "./SComentario";

class SComentarioFactory implements IcomentarioFactory{
    crearComentario(des: string): AComentario {
        return new SComentario(des);
    }
}

export default SComentarioFactory;