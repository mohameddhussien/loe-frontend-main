const { session, refresh, update, reset } = await useSession()
const authenticated = ref(session.value?.token !== undefined)


const loading = ref(false)

const login = async (formData) => {
    loading.value = true
    const { data: response } = await useFetch('login', {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'post',
        body: {
            'username': formData.username,
            'password': formData.password
        }
    })
    loading.value = false
    return response;
}
const register = async (formData) => {
    loading.value = true
    const { data: response } = await useFetch('register', {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'post',
        body: {
            "username": formData.username,
            "first_name": formData.first_name,
            "last_name": formData.last_name,
            "email": formData.email,
            "password": formData.password,
            "confirmpass": formData.password
        }
    })
    loading.value = false
    return response;
}


const logout = async () => {
    await reset()
    reloadNuxtApp()
    console.log("Session has token: ", session.value?.token)
}

export { authenticated as hasToken, login, register, logout, update, refresh, session, loading }