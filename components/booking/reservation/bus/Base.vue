<template>
    <v-row v-for="(deck, deckIndex) in seats" :key="deckIndex" justify="center">
        <v-col  v-for="(seat, seatIndex) in deck" :key="seatIndex"
            v-bind="$attrs">
            <v-row no-gutters>
                <slot :seat="seat" />
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { Seat } from '~/classes/seat';

const props = defineProps({
    seats: Object as () => Seat[][],
    capacity: {
        type: Number,
        default: 50
    }
})

console.log("SEATS: ", props.seats)
</script>

<style scoped></style>