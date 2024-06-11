<template>
    <v-item-group>
        <v-stepper class="elevation-0 rounded-lg" non-linear editable :mobile="mobile"
            :items="['Booking Details', 'Bus Reservation', 'Other Activities']">
            <template #item.1>
                <booking-details-window />
            </template>
            <template #item.2>
                <reservation-window :event="event" />
            </template>
            <template #item.3>
                <h1 class="text-4xl font-bold mb-4">Other Activities</h1>
            </template>
            <!-- <v-stepper-actions>
                <template #next="{ props }">
                    <my-btn @click="() => props.onClick()" :border="false" prepend-icon="mdi-arrow-right"
                        on-hover="bg-pink-accent-1">Next
                        Step</my-btn>
                </template>
                <template #prev="{ props }">
                    <my-btn @click="() => props.onClick()" :border="false" prepend-icon="mdi-arrow-left"
                        on-hover="bg-pink-accent-1">Previous Step</my-btn>
                </template>
            </v-stepper-actions> -->
        </v-stepper>
    </v-item-group>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { LOEEvent } from '~/classes/Event';
defineProps({
    event: Object as PropType<LOEEvent>
})
const { mobile } = useDisplay()
</script>

<style scoped></style>