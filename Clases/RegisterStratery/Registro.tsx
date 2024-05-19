import RegistroStrategy from "./RegistroStrategy";
class Registro{
    private registrostrategy: RegistroStrategy;

  constructor(registrostrategy: RegistroStrategy) {
    this.registrostrategy = registrostrategy;
  }

  setRegistroStrategy(registrostrategy: RegistroStrategy) {
    this.registrostrategy = registrostrategy;
  }

  register(datos:any): boolean {
    return this.registrostrategy.register(datos);
  }

}

export default Registro;