<template>
    <bus-reservation-base :seats="seats" #default="{ seat }">
        <bus-reservation-seat @selected-seat="selectedSeat" :seat="seat" />
    </bus-reservation-base>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { EventBus } from '~/classes/Bus';
import type { Seat } from '~/classes/seat';
const { seats, createSeatsMap } = useBus()

const emits = defineEmits<{ 'selected-seat': [Seat] }>()
const props = defineProps({
    bus: Object as PropType<EventBus>
})

const selectedSeat = (mySeat: Seat) => {
    if (mySeat.seatType != 'driver')
        mySeat.isSelected = !mySeat.isSelected
    emits('selected-seat', mySeat)
}
watch(() => props.bus, (val) => {
    seats.value = createSeatsMap(val)
}, { immediate: true })
</script>

<style scoped></style>