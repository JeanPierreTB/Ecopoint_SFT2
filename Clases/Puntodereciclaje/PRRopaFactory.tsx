import APuntodeReciclaje from "./APuntodeReciclaje";
import IPuntodeReciclajeFactory from "./IPuntodeReciclajeFactory";
import PRRopa from "./PRRopa";

class PRRopaFactory implements IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id: number, latitud: number, longitud: number, lugar: string): APuntodeReciclaje {
        return new PRRopa(id,latitud,longitud,lugar)
    }
}

export default PRRopaFactory;