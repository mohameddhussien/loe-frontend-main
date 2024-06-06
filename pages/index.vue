
<template>
  <v-container fluid>
    <v-row class="ga-2">
      <just-announced class="mt-4" />
      <coming-soon />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useEvents } from '@/composables/useEvents'

definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Ladies only events',
})
const { initializeStates } = useEvents()
await initializeStates()


const eventsThisWeek = computed(() => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today.setDate(today.getDate() - dayOfWeek));
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  weekEnd.setHours(23, 59, 59, 999);

  return events.value.filter(event => {
    const eventStartDate = new Date(event.start_date ?? '');
    return eventStartDate >= weekStart && eventStartDate < weekEnd;
  });
});
</script>

<style lang="scss" scoped></style>