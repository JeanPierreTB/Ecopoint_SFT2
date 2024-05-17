import VerificationStrategy from "./UpdateStraterty";
import DniVerificationStrategy from "../Validador/DniVerificationStrategy";
import EmailVerificationStrategy from "../Validador/EmailVerificationStrategy";
import PasswordVerificationStrategy from "../Validador/PasswordVerificationStrategy";
import PhoneVerificationStrategy from "../Validador/PhoneVerificationStrategy";
import Usuario from "../Usuario/Usuario";

class LocalVerificationStrategy implements VerificationStrategy {
    verify(data: Usuario): boolean {
      console.log("Cuenta local");
      const dniVerificationStrategy = new DniVerificationStrategy();
      const emailVerificationStrategy = new EmailVerificationStrategy();
      const passwordVerificationStrategy = new PasswordVerificationStrategy();
      const phoneVerificationStrategy = new PhoneVerificationStrategy();
  
      return (
        dniVerificationStrategy.verify(data.getDni()!.toString()) &&
        emailVerificationStrategy.verify(data.getnombre()) &&
        passwordVerificationStrategy.verify(data.getcontraseña()) &&
        phoneVerificationStrategy.verify(data.getntelefono()!.toString())
      );
    }
  }

export default LocalVerificationStrategy;