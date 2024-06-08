<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(event, key) in events" :key="key">
                <v-row justify="center" no-gutters align="center">
                    <v-card flat color="transparent">
                        <v-card-text>
                            <v-carousel style="border-radius: 8px;" height="300" cycle :show-arrows="false"
                                hide-delimiter-background class="elevation-4">
                                <v-carousel-item v-for="({ image_id, image_url }) in event.images" :key="image_id"
                                    :src="image_url" cover />
                            </v-carousel>
                            <v-card-title>
                                <span class="text-h6">{{ event.e_name }}</span>
                            </v-card-title>
                            <v-card-subtitle class="d-flex justify-space-between">
                                <span>{{ event.price }}EGP</span>
                                {{ remainingDays(event) }}
                            </v-card-subtitle>
                            <v-chip density="compact" color="primary" class="my-2 px-4 w-100" prepend-icon="mdi-minus">
                                <span>{{ formatDate(event.date_published ?? '') }}</span>
                            </v-chip>
                            <v-btn-group density="comfortable" class="w-100" variant="outlined" divided>
                                <!-- :disabled="statusMappings.some((mapping: any) => event.STATUS in mapping)" -->
                                <v-btn :rounded="false" class="w-50" :to="{ path: '/event', query: { key: event.e_key } }"
                                    prepend-icon="mdi-book-outline">See details!</v-btn>
                                <!-- :disabled="statusMappings.some((mapping: any) => event.STATUS in mapping)" -->
                                <v-btn :rounded="false" class="w-50" @click="auth(event)"
                                    prepend-icon="mdi-seat-outline">Book</v-btn>
                            </v-btn-group>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useEvents } from '~/composables/useEvents'
import { openDialog } from '~/composables/dialogActions';
import type { LOEEvent } from '~/classes/Event';

const { initializeStates, remainingDays, formatDate } = useEvents()
await initializeStates()
// const statusMappings = ref<any>([{ 'Sold Out!': 'sold_out.png' }, { 'Coming Soon!': 'coming_soon.png' }])
// const getImageUrl = (status: any) => {
//     const mapping = statusMappings.value.find((mapping: any) => status in mapping);
//     return mapping ? mapping[status] : null;
// };
const auth = (event: LOEEvent) => {
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