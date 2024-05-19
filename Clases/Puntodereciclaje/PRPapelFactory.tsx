import APuntodeReciclaje from "./APuntodeReciclaje";
import IPuntodeReciclajeFactory from "./IPuntodeReciclajeFactory";
import PRPapel from "./PRPapel";

class PRPapelFactory implements IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id:number=0,latitud:number,longitud:number,lugar:string): APuntodeReciclaje {
        return new PRPapel(id,latitud,longitud,lugar);
    }
}
export default PRPapelFactory;