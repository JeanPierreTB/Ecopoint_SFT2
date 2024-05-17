import VerificationStrategy from "./VerificationStrategy";
class EmailVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
    }
}

export default EmailVerificationStrategy;