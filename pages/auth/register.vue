<template>
    <registration-card img_src="/Ladies_Events_Reg.png" title="Hello there!"
        subtitle="Begin your adventure with our quick registration." to-page="/auth/login"
        to-text="Already have an account?">
        <!-- Registration form fields go here -->
        <template #fields>
            <v-form @submit.prevent="handleSubmit" validate-on="submit" ref="myForm">
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-container fluid>
                            <v-row>
                                <!-- First Name -->
                                <v-col cols="12" sm="6">
                                    <field v-model="registrationForm.first_name" prependInnerIcon="mdi-hail"
                                        label="First Name" :rules="[required]" />
                                </v-col>
                                <!-- Last Name -->
                                <v-col cols="12" sm="6">
                                    <field v-model="registrationForm.last_name" prependInnerIcon="mdi-account-tie"
                                        label="Last Name" :rules="[required]" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-container fluid>
                            <v-row>
                                <!-- Username -->
                                <v-col cols="12" md="6">
                                    <field v-model="registrationForm.username" prependInnerIcon="mdi-account-box-outline"
                                        label="Username" :rules="[required]" />
                                </v-col>
                                <!-- Email -->
                                <v-col cols="12" md="6">
                                    <field v-model="registrationForm.email" prependInnerIcon="mdi-mailbox-open-up-outline"
                                        label="E-mail" :rules="[required, email]" />
                                </v-col>
                                <!-- Password -->
                                <v-col cols="12" md="6">
                                    <field v-model="registrationForm.password" prependInnerIcon="mdi-lock-outline"
                                        label="Password"
                                        :rules="[required, minLength(8), maxLength(24), hasNumber, hasSpecialChar, hasUpperLowerCase]" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                    <!-- <v-window-item :value="3">
                        <v-container fluid>
                            <v-row>
                                User Address
                                <v-col cols="12">
                                    <v-textarea v-model="registrationForm.address" variant="outlined" label="Address" />
                                </v-col>
                                Birth date
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                                                <template v-slot:activator="{ props }">
                                                    <button class="special-button outline-black ga-2 w-100" v-bind="props"
                                                        style="height: 55px;">
                                                        <v-icon v-if="registrationForm.date_of_birth" icon="mdi-check" />
                                                        Birth Date
                                                    </button>
                                                </template>
                                                <v-date-picker v-model="registrationForm.date_of_birth"
                                                    header="Date of Birth">
                                                    <template #actions>
                                                        <v-btn @click="saveBirthDate">Close</v-btn>
                                                        <v-btn @click="toggleBirthDateMenu">Save</v-btn>
                                                    </template>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                Phone number
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="4" sm="4" md="2">
                                            <v-combobox label="Code" item-title="country" item-value="code"
                                                :items="countryCodes" variant="outlined">
                                                <template #selection="{ item }">
                                                    <span>{{ item.value }}</span>
                                                </template>
                                            </v-combobox>
                                        </v-col>
                                        <v-col>
                                            <field v-model="registrationForm.phone_number" prependInnerIcon="mdi-cellphone"
                                                label="Phone Number" hint="Example: 0100 123 4567" :rules="[phone]">
                                            </field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                Gender
                                <v-col cols="12">
                                    <v-radio-group inline v-model="registrationForm.gender">
                                        <v-radio color="grey-darken-1" label="Male" value="male" />
                                        <v-radio color="pink-darken-1" label="Female" value="female" />
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item> -->
                </v-window>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12">
                            <v-divider />
                        </v-col>
                        <v-col cols="12">
                            <v-card-actions>
                                <v-btn :disabled="step <= 1" variant="plain" @click="step--">
                                    Back
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-fab-transition>
                                    <button v-if="step >= 2" type="submit" :loading="loading"
                                        class="special-button primary">
                                        Create account
                                    </button>
                                    <v-btn v-else :disabled="step >= 3" variant="flat" @click="step++">
                                        Next
                                    </v-btn>
                                </v-fab-transition>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </registration-card>
</template>

<script setup>
import { useEvents } from '@/composables/store/events'
import { register, loading } from '@/composables/store/session'


const myForm = ref()
const { required, email, minLength, hasNumber, hasSpecialChar, hasUpperLowerCase, maxLength, phone } = useRules()

definePageMeta({
    layout: 'registration',
})
useHead({
    title: 'Registration',
})
const step = ref(1)
// const menu = ref(false)

const registrationForm = reactive({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: '',
    address: '',
    date_of_birth: null,
    phone_number: ''
})
// const toggleBirthDateMenu = () => {
//     menu.value = !menu.value
// }
// const saveBirthDate = () => {
//     toggleBirthDateMenu()
//     registrationForm.date_of_birth = null
// }
// const { getCountryCodes } = useEvents()
// const { data: countryCodes } = await getCountryCodes();
// console.log(countryCodes.value)
const handleSubmit = async () => {
    const formValidation = await myForm.value.validate()
    console.log(formValidation.errors)
    if (!formValidation.valid)
        return

    const response = await register(registrationForm);
    const responseKey = Object.keys(response.value)[0];
    const responseValue = Object.values(response.value)[0];
    if (responseKey === 'error') {
        showSnackbar({ snackbarText: responseValue, color: 'error' })
        return 0;
    }
    navigateTo('/login')
    showSnackbar({ snackbarText: responseValue, color: 'success' })
}
</script>


<style scoped>
.v-window-item {
    width: 100%;
}
</style>