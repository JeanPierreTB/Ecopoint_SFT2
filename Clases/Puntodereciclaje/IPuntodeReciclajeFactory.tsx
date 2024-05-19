import APuntodeReciclaje from "./APuntodeReciclaje";

interface IPuntodeReciclajeFactory{
    crearpuntoderecilaje(id:number,latitud:number,longitud:number,lugar:string):APuntodeReciclaje;
}

export default IPuntodeReciclajeFactory;