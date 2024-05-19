import AComentario from "./AComentario";
import CComentario from "./CComentario";
import IcomentarioFactory from "./IComentarioFactory";

class CComentarioFactory implements IcomentarioFactory{
    crearComentario(des: string): AComentario {
        return new CComentario(des);
    }
}

export default CComentarioFactory;