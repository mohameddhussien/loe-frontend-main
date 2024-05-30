<template>
    <v-row>
        <v-col cols="12" md="6" lg="8" xxl="10">
            <v-card width="100%" height="100%" variant="elevated">
                <v-card-text>
                    <v-select v-model="selectedCapacity" return-object :items="capacities" label="Select Bus Capacity"
                        variant="outlined" />
                </v-card-text>
            </v-card>
            <bus-assign-seat-details :selected-seat="selectedSeat" :is-dialog-open="selectedSeat != undefined"
                @close="deselectSeat" @assign="selectedSeat?.convertToTakenSeat" />
        </v-col>
        <v-col class="border rounded-lg">
            <bus-reservation-buses @selected-seat="selectSeat" :capacity="selectedCapacity.value" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { Bus } from '@/classes/Bus';
import type { Seat } from '@/classes/seat';

const selectedSeat = ref<Seat>()
const props = defineProps({
    bus: Bus
})


const capacities = [
    { title: 'Small (13)', value: BusCapacity.Small },
    { title: 'Medium Small (14)', value: BusCapacity.MediumSmall },
    { title: 'Medium (21)', value: BusCapacity.Medium },
    { title: 'Large (28)', value: BusCapacity.Large },
    { title: 'Extra Large (50)', value: BusCapacity.ExtraLarge }
];

const selectedCapacity = ref(capacities[0]);

const selectSeat = (mySeat: Seat) => {
    selectedSeat.value = mySeat
}
const deselectSeat = (val: boolean) => {
    if (!selectedSeat.value)
        return
    selectedSeat.value.isSelected = false
    selectedSeat.value = undefined
}
</script>

<style lang="scss" scoped></style>