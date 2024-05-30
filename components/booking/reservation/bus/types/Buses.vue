<template>
    <bus-reservation-base :capacity="capacity" :seats="seats" #default="{ seat }">
        <bus-reservation-seat @selected-seat="selectedSeat" :seat="seat" />
    </bus-reservation-base>
</template>

<script lang="ts" setup>
import type { Seat } from '~/classes/seat';
const { seats, createSeatsArray } = useBus()

const emits = defineEmits<{ 'selected-seat': [Seat] }>()
const props = defineProps({
    capacity: {
        type: Number,
        default: 50
    }
})

const selectedSeat = (mySeat: Seat) => {
    mySeat.isSelected = true
    emits('selected-seat', mySeat)
}
watch(() => props.capacity, (val) => {
    seats.value = createSeatsArray(val)
}, { immediate: true })
</script>

<style scoped></style>