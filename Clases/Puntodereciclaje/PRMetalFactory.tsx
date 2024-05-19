import APuntodeReciclaje from "./APuntodeReciclaje";
import IPuntodeReciclajeFactory from "./IPuntodeReciclajeFactory";
import PRMetal from "./PRMetal";

class PRMetalFactory implements IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id: number, latitud: number, longitud: number, lugar: string): APuntodeReciclaje {
        return new PRMetal(id, latitud, longitud, lugar);
    }
}

export default PRMetalFactory;