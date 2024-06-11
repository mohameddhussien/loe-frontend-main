<template>
    <bus-reservation-base :seats="seats" #default="{ seat }">
        <bus-reservation-seat @selected-seat="selectedSeat" :seat="seat" />
    </bus-reservation-base>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { EventBus } from '~/classes/Bus';
import type { Seat } from '~/classes/seat';
const { seats, createSeatsArray } = useBus()

const emits = defineEmits<{ 'selected-seat': [Seat] }>()
const props = defineProps({
    bus: Object as PropType<EventBus>
})

const selectedSeat = (mySeat: Seat) => {
    mySeat.isSelected = true
    emits('selected-seat', mySeat)
}
watch(() => props.bus, (val) => {
    seats.value = createSeatsArray(val)
    console.log(seats.value)
}, { immediate: true })
</script>

<style scoped></style>