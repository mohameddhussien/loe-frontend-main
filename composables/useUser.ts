import { User } from "~/classes/User"

const user = ref<User>()
type userData = { user: User }

const useUser = () => {
    const baseURL = useRuntimeConfig().public.baseURL as string

    const getUserByToken = async () => {
        const currentToken = useCookie('token')
        const { data, error } = await useFetch('get-user-by-token', {
            baseURL,
            method: 'post',
            body: {
                'token': currentToken.value
            }
        })
        return { data, error }
    }

    const setUser = async () => {
        if (user.value !== undefined || useCookie('token').value) // User is logged in
            return
        const { data, error } = await getUserByToken()
        if (error.value) {
            console.log('User is not set.')
            return
        }
        const resData = data.value as userData
        user.value = resData.user
        console.log('User is set to:', user.value)
    }


    return {
        setUser
    }
}
export { user, useUser }