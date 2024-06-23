<template>
  <v-row>
    <v-col v-if="bus">
      <v-card flat color="transparent">
        <v-card-title>
          <h3 class="text-h3">{{ bus.driver_name }}</h3>
        </v-card-title>
        <v-list nav>
          <v-list-group v-for="(item, index) in bus_info">
            <template #activator="{ props }">
              <v-list-item rounded class="list-expansion" v-bind="props" :title="item.label" :class="{
                'border-b': index != bus_info.length - 1,
              }" />
            </template>
            <v-list-item border :title="item.value" />
          </v-list-group>
        </v-list>
        <v-spacer />
        <v-card-actions class="justify-end">
          <v-dialog>
            <template #activator="{ props }">
              <v-btn variant="tonal" base-color="#4b7baf" v-bind="props">View bus plate</v-btn>
            </template>
            <v-container class="d-flex justify-center">
              <v-card flat max-width="500">
                <v-container fluid>
                  <bus-plate :plate="bus.plate_number" />
                </v-container>
              </v-card>
            </v-container>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-else>
      <p>No bus selected</p>
    </v-col>
  </v-row>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';
import type { EventBus } from '~/classes/Bus';

const props = defineProps({
  bus: Object as PropType<EventBus>
});

const bus_info = reactive([
  { label: "Pickup Location", value: props.bus?.pickup_location },
  { label: "Dropoff Location", value: props.bus?.dropoff_location }
])
</script>
  
<style scoped>
/* Add any additional styles here */
</style>
  