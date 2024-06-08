<template>
    <registration-card img_src="/Ladies_Events_Log.png" title="Welcome Back!"
        subtitle="Sign in effortlessly to access your account." toPage="/auth/register" toText="Create an Account!">
        <!-- Login form fields go here -->
        <template #fields>
            <v-form @submit.prevent="handleSubmit" validateOn="submit" ref="myForm">
                <v-container fluid>
                    <v-row>
                        <!-- Email -->
                        <v-col cols="12">
                            <v-text-field variant="outlined" v-model="loginForm.email"
                                prependInnerIcon="mdi-account-box-outline" label="Email" :rules="[required, email(false)]"
                                type="email" />
                        </v-col>
                        <!-- Password -->
                        <v-col cols="12">
                            <v-text-field variant="outlined" v-model="loginForm.password"
                                :rules="[required, minLength(8), maxLength(24), hasNumber, hasSpecialChar, hasUpperLowerCase]"
                                prependInnerIcon="mdi-lock-outline" label="Password" type="password" />
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <button type="submit" :loading="loading" class="special-button primary w-25"
                                style="min-width: 100px; max-width: 200px;">
                                Login
                            </button>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </registration-card>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'registration'
})
useHead({
    title: 'Login',
})

const { required, minLength, hasNumber, hasSpecialChar, hasUpperLowerCase, maxLength, email } = useRules()
const { login, loading } = useRegistration()


const myForm = ref()
const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
})

const handleSubmit = async () => {
    const formValidation = await myForm.value?.validate()
    if (!formValidation.valid)
        return

    const { data, error } = await login(loginForm)
    if (error.value && !data.value) {
        console.log(error.value.statusMessage, ": ", error.value.data)
        return
    }
    user.value = data.value?.user;
    navigateTo('/')
}
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}
</style>