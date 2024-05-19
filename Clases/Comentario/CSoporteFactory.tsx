import AComentario from "./AComentario";
import CSoporte from "./CSoporte";
import IcomentarioFactory from "./IComentarioFactory";

class CSoporteFactory implements IcomentarioFactory{
    crearComentario(des:string): AComentario {
        return new CSoporte(des);
    }
}

export default CSoporteFactory;