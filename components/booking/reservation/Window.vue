<template>
    <booking-base-window title="Bus Reservation" subtitle="Bus Travel Details:">
        <bus-details :buses="eventBuses" />
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