import PuntodeReciclaje from "./PuntodeReciclaje";

class PuntodeReciclajeFactory {
  static createPuntodeReciclaje(id: number, latitud: number, longitud: number, lugar: string, tipo: string): PuntodeReciclaje {
    return new PuntodeReciclaje(id, latitud, longitud, lugar, tipo);
  }
}


export default PuntodeReciclajeFactory;