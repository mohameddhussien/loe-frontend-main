<template>
    <booking-base-window title="Bus Reservation">
        <v-row>
            <v-col cols="12">
                <p class="text-body-1 text-dark-subtitle">Bus Travel Details:</p>
            </v-col>
            <v-col cols="12">
                <bus-details :buses="eventBuses" />
            </v-col>
        </v-row>
    </booking-base-window>
</template>

<script lang="ts" setup>
import type { EventBus, EventBuses } from '~/classes/Bus';
import { LOEEvent } from '~/classes/Event';
const props = defineProps({
    event: Object as PropType<LOEEvent>
})
const { getBusesOfEvent } = useBus()
const eventBuses = ref<EventBuses>()


const { data, error } = await getBusesOfEvent(props.event?.e_id)

if (!error.value)
    eventBuses.value = data.value as EventBuses

</script>

<style lang="scss" scoped></style>