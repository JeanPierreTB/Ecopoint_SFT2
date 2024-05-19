import Usuario from "../Usuario/Usuario";
import UpdateStraterty from "./UpdateStraterty";
class Update{
    private updateStraterty:UpdateStraterty;

  constructor(updateStraterty:UpdateStraterty) {
    this.updateStraterty = updateStraterty;
  }

  setUpdateStraterty(updateStraterty:UpdateStraterty) {
    this.updateStraterty = updateStraterty;
  }

  verify(data:Usuario): boolean {
    return this.updateStraterty.verify(data);
  }

}

export default Update;

