<template>
    <v-card width="100%" height="100%" color="transparent" flat>
                <v-card-text class="pb-0">
                    <h6 class="text-h6">Select Bus</h6>
                    <v-select v-model="selectedBus" item-title="pickup_location" item-value="capacity" return-object
                        :items="buses" variant="underlined">
                        <template #selection="{ item }">
                            {{ item.title }} - {{ item.value }} - {{ item.raw.dropoff_location }}
                        </template>
                    </v-select>
                </v-card-text>
                <bus-information :bus="selectedBus" />
            </v-card>
</template>

<script lang="ts" setup>
import type { EventBus, EventBuses } from '~/classes/Bus';

defineProps({
    selectedBus: Object as PropType<EventBus>,
    buses: Array as PropType<EventBuses>
})
</script>

<style lang="scss" scoped>

</style>