<template>
    <v-row>
        <v-col cols="12" md="6" lg="8" xxl="10">
            <v-card width="100%" height="100%" variant="elevated">
                <v-card-text>
                    <v-select v-model="selectedBus" item-title="pickup_location" item-value="capacity" return-object
                        :items="buses" label="Select Bus" variant="outlined">
                        <template #selection="{ item }">
                            {{ item.title }} - {{ item.value }} - {{ item.raw.dropoff_location }}
                        </template>
                    </v-select>
                </v-card-text>
            </v-card>
            <bus-assign-seat-details :bus="selectedBus" :seat="selectedSeat" :is-dialog-open="!!selectedSeat"
                @close="deselectSeat" @assign="convertToTakenSeat" />
        </v-col>
        <v-col class="border rounded-lg">
            <bus-reservation-buses @selected-seat="selectSeat" :bus="selectedBus" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { EventBuses, Reservation } from '@/classes/Bus';
import type { Seat } from '@/classes/seat';

const selectedSeat = ref<Seat>()
const props = defineProps({
    buses: {
        type: Object as PropType<EventBuses>,
        default: []
    }
})
const selectedBus = ref(props.buses[0]);

const selectSeat = (mySeat: Seat) => {
    selectedSeat.value = mySeat
}
const deselectSeat = (val: boolean) => {
    if (!selectedSeat.value)
        return
    selectedSeat.value.isSelected = false
    selectedSeat.value = undefined
}

const convertToTakenSeat = (res_form: Record<string, any>) => {
    const res = selectedBus.value?.reservations.find(r => r.seat_number == res_form.seat_number)
    if (res) {
        res.seater = res_form.seater;
        res.seat_number = res_form.seat_number;
    }
    if (!selectedSeat.value)
        return
    selectedSeat.value.label = res_form.seater
    selectedSeat.value.isTaken = true
}
</script>

<style lang="scss" scoped></style>