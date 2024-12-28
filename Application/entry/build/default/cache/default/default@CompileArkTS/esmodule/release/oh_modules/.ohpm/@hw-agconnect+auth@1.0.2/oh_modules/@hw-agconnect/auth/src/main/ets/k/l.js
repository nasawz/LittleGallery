export class PhoneUtil {
    static combinatePhone(countryCode, phoneNumber) {
        if (countryCode != null && !countryCode.startsWith('+')) {
            countryCode = '+' + countryCode;
        }
        return countryCode + '-' + phoneNumber;
    }
}
