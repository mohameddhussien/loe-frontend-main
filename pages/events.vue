<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(event, key) in events" :key="key">
                <v-row justify="center" no-gutters align="center">
                    <v-card class="event-card" hover>
                        <v-card-text>
                            <v-carousel style="border-radius: 8px;" height="300" cycle :show-arrows="false"
                                hide-delimiter-background class="elevation-4">
                                <v-carousel-item v-for="({ image_id, image_url }) in event.images" :key="image_id"
                                    :src="image_url" cover />
                            </v-carousel>
                            <v-card-title>
                                <span class="text-h6">{{ event.e_name }}</span>
                            </v-card-title>
                            <v-card-subtitle style="min-height: 1.5rem;" class="d-flex justify-space-between">
                                <span v-if="event.show_price">{{ event.price }}EGP</span>
                                {{ remainingDays(event) }}
                            </v-card-subtitle>
                            <v-chip density="compact" color="primary" class="my-2 px-4 w-100" prepend-icon="mdi-minus">
                                <span>{{ formatDate(event.date_published ?? '') }}</span>
                            </v-chip>
                            <v-btn-group density="comfortable" class="w-100" variant="outlined" divided>
                                <v-btn :rounded="false" :disabled="event.isComingSoon()" class="w-50"
                                    :to="{ path: '/event', query: { key: event.e_key } }"
                                    prepend-icon="mdi-book-outline">See details!</v-btn>
                                <v-btn :rounded="false" :disabled="event.isComingSoon()" class="w-50" @click="auth(event)"
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
import type { LOEEvent } from '~/classes/Event';

const { toggleDialog } = useDialog()
const { initializeStates, remainingDays, formatDate } = useEvents()
await initializeStates()
// const statusMappings = ref<any>([{ 'Sold Out!': 'sold_out.png' }, { 'Coming Soon!': 'coming_soon.png' }])
// const getImageUrl = (status: any) => {
//     const mapping = statusMappings.value.find((mapping: any) => status in mapping);
//     return mapping ? mapping[status] : null;
// };
const auth = (event: LOEEvent) => {
    loeevent.value = event
    toggleDialog()
    // console.log(event)
    // if (authenticated.value)
    //     openDialog(event)
    // else {
    //     showSnackbar({ snackbarText: 'Prior to booking an event or trip, please ensure you have successfully logged in.', color: 'error' })
    //     navigateTo('/login');
    // }
}

</script>
<style lang="scss" scoped>
// @import '~/assets/scss/utils/variables.scss';

// .v-card--hover {
//     box-shadow: $box-shadow-lighter;
//     transition: box-shadow 1s ease-in-out;

//     &:hover {
//         box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//     }
// }

// .event-card.v-card--variant-elevated {}
</style>