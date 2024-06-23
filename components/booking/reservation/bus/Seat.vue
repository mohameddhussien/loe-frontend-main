<template>
    <button @click="() => selectSeat(seat)" :disabled="seat?.disabled" :class="{ ...computedClass }">
        {{ seat?.seatNumber ? seat?.seatNumber: '' }}
    </button>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { Seat } from '~/classes/seat';
const { name } = useDisplay()

const emits = defineEmits(['selected-seat'])
const props = defineProps({
    seat: Seat,
    isNotSeat: Function,
})

const computedClass = computed(() => {
    if (props.seat) {
        return {
            'seat': true,
            'driver': props.seat.seatType === 'driver',
            'normal': props.seat.seatType === 'normal',
            'passenger': props.seat.seatType === 'passenger',
            'not-seat': props.seat.seatType === 'not-seat',
            'is-taken': props.seat.isTaken && props.seat.seatType !== 'not-seat',
            'is-selected': props.seat.isSelected,
        };
    } else {
        return {};
    }
});
const selectSeat = (seat?: Seat) => {
    if (!seat)
        return;
    emits('selected-seat', seat)
}
</script>

<style scoped></style>