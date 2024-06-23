<template>
    <base-dialog :disabled="!formData?.seater" :dialog-open="isDialogOpen" transition="dialog-bottom-transition"
        @close="closeDialog" persistent>
        <template #title>
            <v-toolbar flat color="transparent">
                <template #title>
                    <v-card flat color="transparent">
                        <template #title>
                            {{ formData?.seater ? 'Assign seat to: ' + formData?.seater : 'Enter Guest Details' }}
                        </template>
                        <template #subtitle>
                            Transaction: {{ reservation?.first_name }} {{ reservation?.last_name }}
                        </template>
                    </v-card>
                </template>
            </v-toolbar>
        </template>
        <template #body>
            <v-form @submit.prevent="submitAndAssignSeat" validate-on="blur" ref="myForm">
                <v-row>
                    <v-col cols="12">
                        {{ formatDate(reservation?.reservation_date) }}
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="formData.seater" label="Seater Name" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="formData.seat_number"
                            :rules="[numberRange(1, Number(bus?.capacity)), seatMigratingToIsNotTaken(normalSeats, reservation)]"
                            type="number" label="Seat Number" />
                    </v-col>
                    <v-col cols="12">
                        <save-dialog-actions @close="closeDialog" :disabled="isSaveDialogDisabled" />
                    </v-col>
                </v-row>
            </v-form>
        </template>
    </base-dialog>
</template>

<script lang="ts" setup>
import { Seat } from '~/classes/seat';
import type { EventBus } from '~/classes/Bus';

const { numberRange, seatMigratingToIsNotTaken } = useRules()
const { normalSeats } = useBus()
const { formatDate } = useEvents()

const emits = defineEmits(['close', 'assign'])
const props = defineProps({
    isDialogOpen: Boolean,
    seat: Seat,
    bus: Object as PropType<EventBus>
})
const myForm = ref()
const isSaveDialogDisabled = ref(false)
const reservation = ref()
const formData = reactive({ seater: '', seat_number: -1 });

const saveInfo = (val: boolean, toSeat?: Seat) => {
    emits('assign', formData, toSeat)
    closeDialog(val)
}

const closeDialog = (val: boolean) => {
    emits('close', val)
}
const submitAndAssignSeat = async () => {
    const formValidation = await myForm.value?.validate()
    if (!formValidation.valid) {
        return
    }
    const toSeat = normalSeats.get(Number(formData.seat_number))
    saveInfo(false, toSeat)
}
watch(() => props.isDialogOpen, (val) => {
    if (val) {
        reservation.value = props.bus?.reservations.find(r => {
            return r.seat_number === props.seat?.seatNumber;
        });

        if (reservation.value) {
            formData.seater = reservation.value.seater ?? reservation.value.first_name
            formData.seat_number = reservation.value.seat_number
        }
        else {
            formData.seater = props.seat?.label ?? ''
            formData.seat_number = props.seat?.seatNumber ?? -1
        }
    }
}, { immediate: true })

</script>

<style lang="scss" scoped></style>