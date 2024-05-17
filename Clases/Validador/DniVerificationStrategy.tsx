import VerificationStrategy from "./VerificationStrategy";
class DniVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const dniRegex = /^\d{8}$/;
        return dniRegex.test(value);
    }
}

export default DniVerificationStrategy;
