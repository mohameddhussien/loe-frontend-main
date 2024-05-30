<template>
    <base-dialog :disabled="!guestForm.guestName" :dialog-open="isDialogOpen" transition="dialog-bottom-transition"
        @close="closeDialog" @assign="saveInfo">
        <template #title>Assign seat to: {{ guestForm.guestName ? guestForm.guestName : 'Enter Guest Details' }}</template>
        <v-row>
            <v-col cols="12">
                <field v-model="guestForm.guestName" :validator="$v" label="Name" hint='Guest Name' />
            </v-col>
        </v-row>
    </base-dialog>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, maxLength } from '@vuelidate/validators';
import { Seat } from '~/classes/seat';

const emits = defineEmits(['close', 'assign'])
const props = defineProps({
    isDialogOpen: Boolean,
    selectedSeat: Seat
})
const guestForm = reactive({
    guestName: ''
})
const saveInfo = (val: boolean) => {
    emits('assign', guestForm.guestName)
    closeDialog(val)
}
const closeDialog = (val: boolean) => {
    emits('close', val)
}
const validations = {
    guestName: {
        required: helpers.withMessage('Guest Name is required.', required),
        minLength: helpers.withMessage('Guest must be at least 3 characters.', minLength(3)),
        maxLength: helpers.withMessage('Guest must be at most 55 characters.', maxLength(55))
    }
}
const $v = useVuelidate(validations, guestForm)

watch(() => props.isDialogOpen, (val) => {
    console.log('Dialog is: ', val ? 'open' : 'closed')
}, { immediate: true })
</script>

<style lang="scss" scoped></style>