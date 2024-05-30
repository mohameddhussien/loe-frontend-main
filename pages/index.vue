
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row justify="center" no-gutters>
          <h1>Just Announced!</h1>
        </v-row>
      </v-col>
      <v-col cols="12" v-for="(event, key) in justAnnouncedEvents" :key="key">
        <v-row justify="center" no-gutters>
          <v-card min-height="300" variant="text" style="width: 100%; max-width: 450px; min-width: 300px;">
            <v-card-text class="d-flex flex-column ga-2">
              <p class="text-center">{{ event.EVENT_NAME }}</p>
              <v-carousel class="elevation-5" cycle hide-delimiter-background :show-arrows="false" :touch="true"
                style="border-radius: 5px;">
                <v-carousel-item v-for="(image) in event.IMAGES" :src="image" cover />
              </v-carousel>
              <button @click="goToDetails(event)" class="special-button outline-primary w-100">See event details</button>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="12" class="bg-primary-2 rounded">
        <v-row>
          <v-col cols="12">
            <v-row justify="center" no-gutters>
              <h1>Comming Soon!</h1>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-carousel delimiter-icon="mdi-circle-outline" :touch="true" style="height: 600px;"
              hide-delimiter-background>
              <template #next="{ props }">
                <v-btn variant="plain" @click="props.onClick()" class="hover:scale-125 hover:-translate-x-2"
                  icon="mdi-skip-next-outline" />
              </template>
              <template #prev="{ props }">
                <v-btn variant="plain" @click="props.onClick()" class="hover:scale-125 hover:translate-x-2"
                  icon="mdi-skip-previous-outline" />
              </template>
              <v-carousel-item class="d-flex justify-center h-[300px]" v-for="event in commingSoonEvents">
                <v-card style="width: 50%; max-width: 500px; min-width: 300px;" class="ma-2 mx-auto pa-4 text-center"
                  variant="text">
                  <p class="font-sans text-center font-medium">{{ event.EVENT_NAME }}</p>
                  <v-carousel class="elevation-5" cycle hide-delimiters :show-arrows="false" :touch="true"
                    style="border-radius: 5px;">
                    <v-carousel-item v-for="image in event.IMAGES" :src="image" cover />
                  </v-carousel>
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useEvents } from '@/composables/store/events'
definePageMeta({
  // set custom layout
  layout: 'default'
})
useHead({
  title: 'Ladies only events',
})
const { getAllEvents } = useEvents()
const { data: events } = await getAllEvents();

const goToDetails = (event) => {
  console.log(event)
  navigateTo({
    path: '/event',
    query: {
      key: event.EVENT_KEY
    }
  })
}

const justAnnouncedEvents = ref(events.value.filter(event => {
  const status = event.STATUS.toString().toLowerCase();
  return status === 'just announced!';
}))
const commingSoonEvents = ref(events.value.filter(event => {
  const status = event.STATUS.toString().toLowerCase();
  return status === 'coming soon!';
}))

</script>

<style lang="scss" scoped></style>