<template>
    <v-container fluid>
        <v-row>
            <v-col xl="3" xxl="4" lg="5" md="5" cols="12">
                <v-carousel cycle hide-delimiter-background :show-arrows="false" :touch="true"
                    style="border-radius: 5px; height: 500px">
                    <v-carousel-item v-for="({ image_id, image_url }) in event?.images" :key="image_id" :src="image_url"
                        cover />
                </v-carousel>
            </v-col>
            <v-col>
                <v-card variant="text">
                    <v-card-title>
                        <h1>{{ event?.e_name }}</h1>
                    </v-card-title>
                    <v-card-subtitle>
                        <span>{{ event?.price }}EGP</span>
                    </v-card-subtitle>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <expand-text :content="event?.description" />
                            </v-col>
                            <v-col cols="auto">
                                <whatsapp :event="event" />
                            </v-col>
                            <v-col cols="auto">
                                <button class="facebook-button" @click="redirectToFacebook" style="width: 50px;">
                                    <v-icon icon="mdi-facebook" />
                                </button>
                            </v-col>
                            <v-col cols="auto">
                                <h2>{{ personCounter.toString() }} People</h2>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="auto">
                                        <button @click="openBookingDetails" class="special-button primary"
                                            style="height: 43px;">
                                            <v-icon icon="mdi-seat-outline" />
                                            Book Trip
                                        </button>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-row no-gutters class="ga-2">
                                            <increment-decrement-person add-button-variant="outline-primary"
                                                remove-button-variant="outline-secondary" />
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useEvents } from "~/composables/useEvents";
import { openDialog } from "~/composables/dialogActions";
import { showSnackbar } from "~/composables/snackBarActions";
import type { LOEEvent } from "~/classes/Event";

const { query } = useRoute();
const event = ref<LOEEvent>()
const { getEventByID } = useEvents();

getEventByID(query.key as string).then(({ data }) => {
    event.value = data
    console.log(event.value)
})

const redirectToFacebook = () => {
    window.location.href = 'https://www.facebook.com/EventsforLadies/';
};

useHead({
    title: event.value?.e_name,
});
definePageMeta({
    middleware: ["event-not-found"],
});


const openBookingDetails = () => {
    openDialog(event);
    // if (authenticated.value)
    //     openDialog(event?.value)
    // else {
    //     showSnackbar({ snackbarText: 'Prior to booking an event or trip, please ensure you have successfully logged in.', color: 'error' })
    //     navigateTo('/login');
    // }
};
</script>

<style lang="scss" scoped></style>