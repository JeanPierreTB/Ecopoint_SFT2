// RegistroNormal.ts
import { Alert } from "react-native";
import Usuario from "../Usuario/Usuario";
import PasswordVerificationStrategy from "../Validador/PasswordVerificationStrategy";
import DniVerificationStrategy from "../Validador/DniVerificationStrategy";
import EmailVerificationStrategy from "../Validador/EmailVerificationStrategy";
import PhoneVerificationStrategy from "../Validador/PhoneVerificationStrategy";

class RegistroNormal implements RegistroStrategy {
    register(datos:Usuario):boolean {
        const dniVerificationStrategy = new DniVerificationStrategy();
        const emailVerificationStrategy = new EmailVerificationStrategy();
        const passwordVerificationStrategy = new PasswordVerificationStrategy();
        const phoneVerificationStrategy = new PhoneVerificationStrategy();

        // Verifica cada campo utilizando su estrategia de verificación correspondiente
        return(dniVerificationStrategy.verify(datos.getDni()!.toString()) &&
            emailVerificationStrategy.verify(datos.getnombre()) &&
            passwordVerificationStrategy.verify(datos.getcontraseña()) &&
            phoneVerificationStrategy.verify(datos.getntelefono()!.toString())); 
    }
}

export default RegistroNormal;
