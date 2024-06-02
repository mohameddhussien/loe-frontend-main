<template>
    <registration-card img_src="/Ladies_Events_Log.png" title="Forgot Your Password?"
        subtitle="No worries! We'll help you get back into your account." toPage="/auth/login"
        toText="Remembered your password?">
        <!-- Login form fields go here -->
        <template #fields>
            <v-form @submit.prevent="handleSubmit" ref="myForm">
                <v-container fluid>
                    <v-row>
                        <!-- Username -->
                        <v-col cols="12">
                            <field v-model="forgotPassForm.email" prependInnerIcon="mdi-account-box-outline" label="Email"
                                type="email" :rules="[required, email(false)]" />
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <button type="submit" class="special-button primary w-25"
                                style="min-width: 100px; max-width: 200px;">
                                Submit form
                            </button>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </registration-card>
</template>

<script setup>
const { email, required } = useRules()
const myForm = ref()
definePageMeta({
    layout: 'registration'
})
useHead({
    title: 'Forgot Password',
})
const forgotPassForm = reactive({
    email: '',
})
const handleSubmit = async () => {
    const formValidation = await myForm.value.validate()
    if (!formValidation.valid)
        return

}
</script>

<style lang="scss" scoped></style>