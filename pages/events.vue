<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(event, key) in events" :key="key" class="d-flex justify-center relative">
                <v-img style="position: absolute; z-index: 1; bottom: -2px;"
                    v-if="statusMappings.some(mapping => event.STATUS in mapping)" :src="getImageUrl(event.STATUS)"
                    aspect-ratio="2/1" width="100"></v-img>
                <div class="d-flex flex-column gap-y-4">
                    <v-carousel style="width: 300px; height: 300px; border-radius: 10px;" cycle :show-arrows="false"
                        hide-delimiter-background class="elevation-5">
                        <v-carousel-item v-for="image in event.IMAGES" :src="image" cover />
                    </v-carousel>
                    <span class="font-sans d-flex justify-between">
                        <span class="font-bold text-xl">{{ event.EVENT_NAME }}</span>
                        <SpecialTextDesign class="text-md pa-1" :to-be-decorated="event.PRICE" after="EGP"
                            :color="`bg-pink-accent-1 ${['Sold Out!', 'Coming Soon!'].includes(event.STATUS) ? 'line-through' : ''}`" />
                    </span>
                    <span class="save-badge bg-pink-lighten-5 d-flex gap-2">
                        <v-icon icon="mdi-minus" size="small" />
                        <p>{{ event.STATUS }}</p>
                        <p class="ml-auto">{{ format(new Date(event.EVENT_DATE), 'dd-MM-yyyy') }}</p>
                    </span>
                    <v-btn-group style="min-width: 300px; width: 300px;" rounded density="compact" variant="outlined"
                        divided>
                        <v-btn :disabled="statusMappings.some(mapping => event.STATUS in mapping)"
                            :to="{ path: `/event`, query: { key: event.EVENT_KEY } }" min-width="64%"
                            prepend-icon="mdi-book-outline">See details!</v-btn>
                        <v-btn :disabled="statusMappings.some(mapping => event.STATUS in mapping)" @click="auth(event)"
                            min-width="34%" prepend-icon="mdi-seat-outline">Book</v-btn>
                    </v-btn-group>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useEvents } from '~/composables/store/events'
import { format } from 'date-fns';
import { hasToken as authenticated } from '~/composables/store/session'
import { openDialog } from '~/composables/dialogActions';

const { getAllEvents } = useEvents()
const { data: events } = await getAllEvents();

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

//  On window resize hide drawer
const windowWidth = ref(window.innerWidth)
const onWidthChange = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
</script>
<style scoped>
.save-badge {
    min-width: 300px;
    width: 300px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: 500;
    padding: 0 10px;
    vertical-align: middle;
}
</style>