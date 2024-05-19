import APuntodeReciclaje from "./APuntodeReciclaje";
import IPuntodeReciclajeFactory from "./IPuntodeReciclajeFactory";
import PRBaterias from "./PRBaterias";

class PRBateriasFactory implements IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id: number, latitud: number, longitud: number, lugar: string): APuntodeReciclaje {
        return new PRBaterias(id, latitud, longitud, lugar);
    }
}

export default PRBateriasFactory;