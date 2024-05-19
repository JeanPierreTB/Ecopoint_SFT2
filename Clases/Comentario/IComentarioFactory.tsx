import AComentario from "./AComentario";

interface IcomentarioFactory{
    crearComentario(des:string):AComentario;
}

export default IcomentarioFactory;
