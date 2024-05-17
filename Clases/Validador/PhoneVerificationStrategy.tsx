import VerificationStrategy from "./VerificationStrategy";
class PhoneVerificationStrategy implements VerificationStrategy {
    verify(value: string): boolean {
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(value);
    }
}

export default PhoneVerificationStrategy;