import { Alert } from "react-native";
import Usuario from "../Usuario_Vista/Usuario";
import EmailVerificationStrategy from "../Validador/EmailVerificationStrategy";
import Validador from "../Validador/Validador";
import RegistroStrategy from "./RegistroStrategy";
class RegistroGoogle implements RegistroStrategy {
    register(datos: Usuario):boolean {
       const emailVerificationStrategy=new Validador(new EmailVerificationStrategy());
       
       return (emailVerificationStrategy.verify(datos.getnombre()))
    }
}

export default RegistroGoogle;