import { Alert } from "react-native";
import Usuario from "../Usuario/Usuario";
import EmailVerificationStrategy from "../Validador/EmailVerificationStrategy";
class RegistroGoogle implements RegistroStrategy {
    register(datos: Usuario):boolean {
       const emailVerificationStrategy=new EmailVerificationStrategy();
       return (emailVerificationStrategy.verify(datos.getnombre()))
    }
}

export default RegistroGoogle;