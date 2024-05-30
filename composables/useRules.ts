const useRules = () => {
    const rules = {
        required: (value: any) => !!value || 'Required field',
        email: (value: any) => {
            const pattern = /^[^@]+@[^@]+\.[^@]+$/;
            return pattern.test(value) || 'Invalid e-mail format';
        },
        minLength: (min: number) => (value: any) => value.length >= min || `Min ${min} characters required`,
        maxLength: (max: number) => (value: any) => value.length <= max || `Max ${max} characters allowed.`,
        hasNumber: (value: any) => /\d/.test(value) || 'Must contain at least one number.',
        hasSpecialChar: (value: any) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Must contain at least one special character.',
        hasUpperLowerCase: (value: any) => /[a-z]/.test(value) && /[A-Z]/.test(value) || 'Must contain both uppercase and lowercase letters.',
        phone: (value: any) => {
            const pattern = /^\+?[1-9]\d{1,14}$/; // E.164 international phone number format
            return pattern.test(value) || 'Invalid phone number.';
        },
    };

    return {
        ...rules
    };
}

export { useRules }