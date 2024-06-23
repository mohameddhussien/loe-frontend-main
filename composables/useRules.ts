import type { Reservation } from "~/classes/Bus";
import type { Deck } from "~/classes/seat";

type RuleFunction = (value: any) => boolean | string;
type RuleGeneratorFunction = (minAge: number, maxAge: number) => RuleFunction;
type OptionalValidatorFunction = (optional: boolean) => RuleFunction;

type Rule = RuleFunction | RuleGeneratorFunction | OptionalValidatorFunction;

type Rules = Rule[];

const useRules = () => {
    const range = (value: number, minAge: number, maxAge: number) => {
        return value >= minAge && value <= maxAge
    }
    const ageRangeValidator = (minAge: number, maxAge: number, caption: string) => (value: number) => {
        return range(value, minAge, maxAge) || `${caption} age is required (${minAge} to ${maxAge} years)`;
    };
    const rules = {
        required: (value: any) => !!value || 'Required field',
        email: (optional: boolean) => (value: any) => {
            if (optional && !value)
                return true;
            const pattern = /^[^@]+@[^@]+\.[^@]+$/;
            return pattern.test(value) || 'Invalid e-mail format';
        },
        minLength: (min: number) => (value: any) => value.length >= min || `Min ${min} characters required`,
        maxLength: (max: number) => (value: any) => value.length <= max || `Max ${max} characters allowed.`,
        hasNumber: (value: any) => /\d/.test(value) || 'Must contain at least one number.',
        hasSpecialChar: (value: any) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Must contain at least one special character.',
        hasUpperLowerCase: (value: any) => /[a-z]/.test(value) && /[A-Z]/.test(value) || 'Must contain both uppercase and lowercase letters.',
        phone: (optional: boolean) => (value: any) => {
            if (optional && !value)
                return true;
            const pattern = /^(?:0)?1[0125]\d{8}$/
            return pattern.test(value) || 'Invalid phone number.';
        },
        adultAge: (minAge: number, maxAge: number) => ageRangeValidator(minAge, maxAge, 'Adult'),
        childAge: (minAge: number, maxAge: number) => ageRangeValidator(minAge, maxAge, 'Child'),
        age: (value: number) => value > 0 || 'Age must be greater than 0',
        numberRange: (min: number, max: number) => (value: number) => range(value, min, max) || `Enter a number in the seat range (${min} to ${max}).`,
        seatMigratingToIsNotTaken: (seats: Deck, res?: Reservation) => (value: any) => {
            const seat_num = Number(value)
            const seat = seats.get(seat_num)

            if (seat && seat.isTaken && res?.seat_number !== seat_num)
                return "Seat is taken, Please choose another seat."
            return true
        },
    };
    



    return {
        ...rules
    };
}

export { useRules }
export type { Rules }