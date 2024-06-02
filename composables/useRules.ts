type RuleFunction = (value: any) => boolean | string;
type RuleGeneratorFunction = (minAge: number, maxAge: number) => RuleFunction;
type OptionalValidatorFunction = (optional: boolean) => RuleFunction;

type Rule = RuleFunction | RuleGeneratorFunction | OptionalValidatorFunction;

type Rules = Rule[];

const useRules = () => {
    const ageRangeValidator = (minAge: number, maxAge: number, caption: string) => (value: number) => {
        return value >= minAge && value <= maxAge || `${caption} age is required (${minAge} to ${maxAge} years)`;
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
        // isNumber: (value: any) => typeof value === 'number' || 'Value must be a number'
    };

    return {
        ...rules
    };
}

export { useRules }
export type { Rules }