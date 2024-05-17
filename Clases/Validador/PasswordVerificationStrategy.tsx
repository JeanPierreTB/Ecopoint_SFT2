import VerificationStrategy from "./VerificationStrategy";
class PasswordVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const passwordRegex = /.{8,}/;
        return passwordRegex.test(value);
    }
}

export default PasswordVerificationStrategy;
