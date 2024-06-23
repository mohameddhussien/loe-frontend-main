<template>
    <v-row v-for="([rowNumber, deck], deckIndex) in seats" :key="deckIndex" justify="center">
        <v-col v-for="([seatNumber, seat], seatIndex) in deck" :key="seatIndex" v-bind="$attrs">
            <v-row no-gutters>
                <slot :seat="seat" />
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import type { Seats } from '~/classes/seat';

const props = defineProps({
    seats: Object as PropType<Seats>,
})

</script>

<style scoped></style>