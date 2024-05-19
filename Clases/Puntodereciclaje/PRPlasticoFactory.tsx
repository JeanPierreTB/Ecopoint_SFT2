import APuntodeReciclaje from "./APuntodeReciclaje";
import IPuntodeReciclajeFactory from "./IPuntodeReciclajeFactory";
import PRPlastico from "./PRPlastico";

class PRPlasticoFactory implements IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id: number, latitud: number, longitud: number, lugar: string): APuntodeReciclaje {
        return new PRPlastico(id, latitud, longitud, lugar);
    }
}


export default PRPlasticoFactory;