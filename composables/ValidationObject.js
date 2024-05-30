import { required, email, minLength, helpers, alphaNum, maxLength, numeric, } from '@vuelidate/validators';

export const useValidationObject = {
    username: { required: helpers.withMessage('Username is required.', required) },
    email: {
        required: helpers.withMessage('Email is required.', required),
        email: helpers.withMessage('Invalid email format.', email),
    },
    password: {
        alphaNum: helpers.withMessage('Password should be alpha numeric', alphaNum),
        required: helpers.withMessage('Password is required.', required),
        minLength: helpers.withMessage('Password must be at least 8 characters.', minLength(8)),
        maxLength: helpers.withMessage('Password must be at most 128 characters.', maxLength(128)),
    },
    first_name: { required: helpers.withMessage('Field is required.', required) },
    last_name: { required: helpers.withMessage('Field is required.', required) },
    phone_number: {
        required: helpers.withMessage('Field is required.', required),
        numeric: helpers.withMessage('Numeric values only.', numeric),
        validPhone: helpers.withMessage('Invalid Phone Number', helpers.regex(/01\d{9}$/)),
    },
    guestName: {
        required: helpers.withMessage('Guest Name is required.', required),
        minLength: helpers.withMessage('Guest must be at least 3 characters.', minLength(3)),
        maxLength: helpers.withMessage('Guest must be at most 55 characters.', maxLength(55))
    }
};
