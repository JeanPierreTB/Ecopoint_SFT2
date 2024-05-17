import PuntodeReciclaje from "./PuntodeReciclaje";

class PuntodeReciclajeFactory {
    static createPuntodeReciclaje(puntodereciclaje:PuntodeReciclaje): PuntodeReciclaje {
      return new PuntodeReciclaje(puntodereciclaje.getid(),puntodereciclaje.getlatitud(),puntodereciclaje.getlongitud(),puntodereciclaje.getlugar(),puntodereciclaje.gettipo());
    }
}


export default PuntodeReciclajeFactory;