<template>
    <v-card flat width="400" color="transparent">
        <v-card-text>
            <v-carousel cycle continuous hide-delimiter-background :show-arrows="false" :touch="true"
                style="border-radius: 8px" height="300">
                <v-carousel-item v-for="({ image_id, image_url }) in event.images" :key="image_id" :src="image_url" cover />
            </v-carousel>
        </v-card-text>
        <v-card-title class="d-flex justify-space-between align-center">
            <h5>{{ event.e_name }}</h5>
            <v-card-subtitle>
                <p>{{ remainingDays(event) }}</p>
            </v-card-subtitle>
        </v-card-title>
        <v-card-actions class="justify-end">
            <button @click="goToDetails(event.e_key)" class="special-button outline-primary w-100">
                See event details
            </button>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import type { LOEEvent } from '~/classes/Event';

const { goToDetails, remainingDays } = useEvents()

defineProps({
    event: { type: Object as PropType<LOEEvent>, default: {} },
})
</script>

<style lang="scss" scoped></style>