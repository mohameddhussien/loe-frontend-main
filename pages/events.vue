<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(event, key) in events" :key="key">
                <v-row justify="center" no-gutters align="center">
                    <!-- <v-img style="position: absolute; z-index: 1; bottom: -2px;"
                    v-if="statusMappings.some(mapping => event.STATUS in mapping)" :src="getImageUrl(event.STATUS)"
                    aspect-ratio="2/1" width="100"></v-img> -->
                    <v-card flat color="transparent">
                        <v-card-text>
                            <v-carousel style="border-radius: 8px;" height="300" cycle :show-arrows="false"
                                hide-delimiter-background class="elevation-4">
                                <v-carousel-item v-for="image in event.IMAGES" :src="image" cover />
                            </v-carousel>
                            <v-card-title>
                                <span class="text-h6">{{ event.EVENT_NAME }}</span>
                            </v-card-title>
                            <v-card-subtitle class="d-flex justify-space-between">
                                <span>{{ event.PRICE }}EGP</span>
                                {{ remainingDays(event) }}
                            </v-card-subtitle>
                            <v-chip density="compact" color="primary" class="my-2 px-4 w-100" prepend-icon="mdi-minus">
                                <span>{{ event.STATUS }}</span>
                            </v-chip>
                            <v-btn-group density="comfortable" class="w-100" variant="outlined" divided>
                                <v-btn :rounded="false" class="w-50" :disabled="statusMappings.some(mapping => event.STATUS in mapping)"
                                    :to="{ path: `/event`, query: { key: event.EVENT_KEY } }"
                                    prepend-icon="mdi-book-outline">See details!</v-btn>
                                <v-btn :rounded="false" class="w-50" :disabled="statusMappings.some(mapping => event.STATUS in mapping)"
                                    @click="auth(event)" prepend-icon="mdi-seat-outline">Book</v-btn>
                            </v-btn-group>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useEvents } from '~/composables/store/events'
import { hasToken as authenticated } from '~/composables/store/session'
import { openDialog } from '~/composables/dialogActions';

const { getAllEvents } = useEvents()
const { data: events } = await getAllEvents();
const remainingDays = (event) => {
    const eventDate = new Date(event.EVENT_DATE);
    const currentDate = new Date();

    const difference = eventDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(difference / (1000 * 3600 * 24));

    return remainingDays > 0 ? remainingDays + 'DAYS LEFT!' : '';
}
const statusMappings = ref([{ 'Sold Out!': 'sold_out.png' }, { 'Coming Soon!': 'coming_soon.png' }])

const getImageUrl = (status) => {
    const mapping = statusMappings.value.find(mapping => status in mapping);
    return mapping ? mapping[status] : null;
};
const auth = (event) => {
    openDialog(event)
    // console.log(event)
    // if (authenticated.value)
    //     openDialog(event)
    // else {
    //     showSnackbar({ snackbarText: 'Prior to booking an event or trip, please ensure you have successfully logged in.', color: 'error' })
    //     navigateTo('/login');
    // }
}

</script>
<style scoped></style>