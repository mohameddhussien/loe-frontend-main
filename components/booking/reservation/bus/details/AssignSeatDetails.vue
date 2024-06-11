<template>
    <base-dialog :disabled="!res_form?.seater" :dialog-open="isDialogOpen" transition="dialog-bottom-transition"
        @close="closeDialog" @assign="saveInfo">
        <template #title>
            <v-toolbar flat color="transparent">
                <template #title>
                    {{ res_form?.seater ? 'Assign seat to: ' + res_form?.seater : 'Enter Guest Details' }}
                </template>
            </v-toolbar>
        </template>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="res_form.seater" label="Name" hint='Guest Name' />
            </v-col>
        </v-row>
    </base-dialog>
</template>

<script lang="ts" setup>
import { Seat } from '~/classes/seat';
import type { EventBus, Reservation } from '~/classes/Bus';

const emits = defineEmits(['close', 'assign'])
const props = defineProps({
    isDialogOpen: Boolean,
    seat: Seat,
    bus: Object as PropType<EventBus>
})

const saveInfo = (val: boolean) => {
    emits('assign', res_form)
    closeDialog(val)
}
const closeDialog = (val: boolean) => {
    emits('close', val)
}

const res_form = reactive({ seater: '', seat_number: -1 });
watch(() => props.isDialogOpen, (val) => {
    if (val) {
        const foundReservation = props.bus?.reservations.find(r => {
            return r.seat_number === props.seat?.seatNumber;
        });

        if (foundReservation) {
            res_form.seater = foundReservation.seater ?? foundReservation.first_name
            res_form.seat_number = foundReservation.seat_number
        }
    }
}, { immediate: true })
</script>

<style lang="scss" scoped></style>