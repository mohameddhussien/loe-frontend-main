<template>
    <v-row class="ga-2">
        <v-col class="border rounded-lg">
            <bus-reservation-buses @selected-seat="selectSeat" :bus="selectedBus" />
        </v-col>
        <v-col cols="12" md="6" lg="8" xxl="10" class="border rounded-lg">
            <!-- <bus-select-bus v-model:select-bus="selectedBus" :buses="buses" /> -->
            <v-row>
                <v-col cols="12">
                    <v-row class="px-4 pt-2">
                        <v-col>
                            <h6 class="text-h6">Select Bus</h6>
                        </v-col>
                        <v-col cols="auto">
                            <h5 class="text-h5">{{ selectedBus.capacity }}</h5>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="selectedBus" item-title="pickup_location" item-value="capacity" return-object
                                :items="buses" variant="underlined">
                                <template #selection="{ item }">
                                    <v-list-item-title>
                                        {{ item.title }} - {{ item.value }} - {{ item.raw.dropoff_location }}
                                    </v-list-item-title>
                                </template>
                            </v-select>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <bus-information :bus="selectedBus" />
                </v-col>
            </v-row>
            <bus-assign-seat-details :bus="selectedBus" :seat="selectedSeat" :is-dialog-open="!!selectedSeat"
                @close="deselectSeat" @assign="convertToTakenSeat" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { EventBuses, Reservation } from '@/classes/Bus';
import type { Seat } from '@/classes/seat';

const { seats } = useBus()
const selectedSeat = ref<Seat>()
const props = defineProps({
    buses: {
        type: Object as PropType<EventBuses>,
        default: []
    }
})
const selectedBus = ref(props.buses[0]);

const selectSeat = (mySeat: Seat) => {
    if (mySeat.seatType != 'driver')
        selectedSeat.value = mySeat
}
const deselectSeat = (val: boolean) => {
    if (!selectedSeat.value)
        return
    selectedSeat.value.isSelected = false
    selectedSeat.value = undefined
}
function swapSeatData(fromSeat: Seat, toSeat: Seat, reservation?: Reservation) {
    const tempAttributes = { ...fromSeat }; // Create temporary copy

    // Swap seat data
    fromSeat.reservation_id = toSeat.reservation_id;
    fromSeat.label = toSeat.label;
    fromSeat.disabled = toSeat.disabled;
    fromSeat.isTaken = toSeat.isTaken;

    toSeat.reservation_id = tempAttributes.reservation_id;
    toSeat.label = tempAttributes.label;
    toSeat.disabled = tempAttributes.disabled;
    toSeat.isTaken = tempAttributes.isTaken;

    // Handle reservation swapping (if applicable)
    if (reservation) {
        reservation.seat_number = fromSeat.seatNumber;
        reservation.seater = fromSeat.label;
    }
}

function convertToTakenSeat(formData: { seater: string; seat_number: number }, seat: Seat) {
    const { seater, seat_number } = formData;

    if (!selectedSeat.value) {
        return; // Handle case where selectedSeat is not available
    }

    const fromSeat = seats.value.get(selectedSeat.value.position[0])?.get(selectedSeat.value.seatNumber);
    const toSeat = seats.value.get(seat.position[0])?.get(Number(seat_number));

    if (!fromSeat || !toSeat) {
        return; // Handle case where seats are not found
    }

    if (fromSeat.seatNumber === toSeat.seatNumber) {
        fromSeat.label = seater;
        selectedSeat.value.label = seater; // Update selectedSeat if needed
    } else {
        // Find associated reservations for seats (assuming you have logic for this)
        const reservation = selectedBus.value.reservations.find(r => r.seat_number === fromSeat.seatNumber);

        swapSeatData(fromSeat, toSeat, reservation);
        // console.log(fromReservation)
        // console.log(toReservation)
        // console.log("From seat: ", fromSeat)
        // console.log("To seat: ", toSeat)
    }

}
</script>

<style lang="scss" scoped></style>