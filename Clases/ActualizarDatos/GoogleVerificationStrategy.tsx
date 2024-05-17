import VerificationStrategy from "./UpdateStraterty";
import DniVerificationStrategy from "../Validador/DniVerificationStrategy";
import PhoneVerificationStrategy from "../Validador/PhoneVerificationStrategy";
import Usuario from "../Usuario/Usuario";
class GoogleVerificationStrategy implements VerificationStrategy {
    verify(data: Usuario): boolean {
      console.log("Cuenta de google");
      const dniVerificationStrategy = new DniVerificationStrategy();
      const phoneVerificationStrategy = new PhoneVerificationStrategy();
  
      return (
        dniVerificationStrategy.verify(data.getDni()!.toString()) &&
        phoneVerificationStrategy.verify(data.getntelefono()!.toString())
      );
    }
  }

export default GoogleVerificationStrategy;