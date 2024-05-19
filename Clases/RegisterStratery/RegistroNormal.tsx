// RegistroNormal.ts
import { Alert } from "react-native";
import Usuario from "../Usuario/Usuario";
import PasswordVerificationStrategy from "../Validador/PasswordVerificationStrategy";
import DniVerificationStrategy from "../Validador/DniVerificationStrategy";
import EmailVerificationStrategy from "../Validador/EmailVerificationStrategy";
import PhoneVerificationStrategy from "../Validador/PhoneVerificationStrategy";
import Validador from "../Validador/Validador";
import RegistroStrategy from "./RegistroStrategy";

class RegistroNormal implements RegistroStrategy {
    register(datos:Usuario):boolean {
        const verificationStrategy = new Validador(new DniVerificationStrategy());
        const dnivalor=verificationStrategy.verify(datos.getDni()!.toString());

        verificationStrategy.setVerificationStrategy(new EmailVerificationStrategy());
        const emailvalor=verificationStrategy.verify(datos.getnombre())

        verificationStrategy.setVerificationStrategy(new PasswordVerificationStrategy);
        const passwordvalor=verificationStrategy.verify(datos.getcontraseña())
        
        verificationStrategy.setVerificationStrategy(new PhoneVerificationStrategy());
        const phonevalor=verificationStrategy.verify(datos.getntelefono()!.toString());

        

        return(dnivalor && emailvalor && passwordvalor && phonevalor); 
    }
}

export default RegistroNormal;
