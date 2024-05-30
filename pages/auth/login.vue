<template>
    <registration-card img_src="/Ladies_Events_Log.png" title="Welcome Back!"
        subtitle="Sign in effortlessly to access your account." toPage="/auth/register" toText="Create an Account!">
        <!-- Login form fields go here -->
        <template #fields>
            <v-form @submit.prevent="handleSubmit" validateOn="submit" ref="myForm">
                <v-container fluid>
                    <v-row>
                        <!-- Username / Email -->
                        <v-col cols="12">
                            <field v-model="loginForm.username" prependInnerIcon="mdi-account-box-outline"
                                label="Username/Email" :rules="[required]" type="username" />
                        </v-col>
                        <!-- Password -->
                        <v-col cols="12">
                            <field v-model="loginForm.password"
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

<script setup>
import { login, loading, hasToken, update, refresh } from '@/composables/store/session'
const { required, minLength, hasNumber, hasSpecialChar, hasUpperLowerCase, maxLength } = useRules()
const myForm = ref()
definePageMeta({
    layout: 'registration'
})
useHead({
    title: 'Login',
})
const loginForm = reactive({
    username: '',
    password: '',
})

const handleSubmit = async () => {
    const formValidation = await myForm.value.validate()
    // console.log(formValidation.errors)
    if (!formValidation.valid)
        return
    
    const response = await login(loginForm)
    if (response.value?.error) {
        showSnackbar({ snackbarText: response.value?.error, color: 'error' })
        hasToken.value = false
        return 0;
    }
    showSnackbar({ snackbarText: response.value?.success, color: 'success' })
    hasToken.value = true
    await update({ token: response.value?.token })
    await refresh()
    window.history.back();
}
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}
</style>