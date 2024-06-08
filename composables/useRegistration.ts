import { Buffer } from 'buffer'

interface LoginForm {
    email?: string;
    password?: string;
}
interface RegistrationForm extends LoginForm {
    username?: string;
    first_name?: string;
    last_name?: string;
}
const useRegistration = () => {
    const baseURL = useRuntimeConfig().public.baseURL as string
    const loading = ref(false)
    const isAuthenticated = ref(!!useCookie('token').value)

    const setSessionToken = (data: any) => {
        if (data) {
            const token = useCookie('token', {
                expires: new Date(Date.now() + 12 * 60 * 60 * 1000), // Set expiration to 12 hours
                // encode: (value: string) => {
                //     const encodedToken = Buffer.from(value).toString('base64');
                //     console.log("Text: ", value, "Encoded text: ", encodedToken)
                //     return encodedToken
                // },
                // decode: (value: string) => {
                //     const decodedToken = Buffer.from(value, 'base64').toString('utf-8');
                //     console.log("Text: ", value, "Encoded text: ", decodedToken)
                //     return decodedToken
                // },
                // httpOnly: true,
                // secure: true,
                sameSite: 'strict',
                // path: '/'
            });
            token.value = data.token
            console.log(token.value)
            // sessionStorage.setItem('token', data.token)
            isAuthenticated.value = true
        }
    }

    const login = async (formData: LoginForm) => {
        const { data, error } = await useFetch('login', {
            method: 'post',
            baseURL,
            body: {
                'email': formData.email,
                'password': formData.password
            },
            onRequest: () => {
                loading.value = true
            },
            onResponse: () => {
                loading.value = false
            }
        })
        setSessionToken(data.value)
        return { data, error };
    }

    const register = async (formData: RegistrationForm) => {
        // const { data: response } = await useFetch('register', {
        //     baseURL,
        //     method: 'post',
        //     body: {
        //         "username": formData.username,
        //         "first_name": formData.first_name,
        //         "last_name": formData.last_name,
        //         "email": formData.email,
        //         "password": formData.password,
        //         "confirmpass": formData.password
        //     },
        //     onRequest: () => {
        //         loading.value = true
        //     },
        //     onResponse: () => {
        //         loading.value = false
        //     }
        // })

        // return response;
    }

    const logout = async () => {
        const currentToken = useCookie('token')
        user.value = undefined
        isAuthenticated.value = false
        currentToken.value = undefined
        reloadNuxtApp({ force: true, ttl: 3000 })
        // sessionStorage.removeItem('token')
    }

    return {
        register,
        login,
        logout,
        loading,
        isAuthenticated
    }
}


export { useRegistration }
export type { LoginForm, RegistrationForm }