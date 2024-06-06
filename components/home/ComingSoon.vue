<template>
    <ad-grid>
        <swiper-grid title="Coming Soon" class="section white" :breakpoints="comingSoonBreakpoints"
            :items="commingSoonEvents">
            <template #default="{ item }">
                <event-card :event="item" />
            </template>
            <template #header-options>
                <v-btn @click="filterToEventStatus('coming soon')" :disabled="commingSoonEvents.length < 4" variant="tonal">
                    View more
                </v-btn>
            </template>
        </swiper-grid>
    </ad-grid>
</template>

<script lang="ts" setup>
import SwiperGrid from './SwiperGrid.vue';

const { filterToEventStatus } = useEvents()
const { comingSoonBreakpoints } = useSlider()

const commingSoonEvents = computed(() => events.value.filter(event =>
    event.isComingSoon()
).slice(0, 3));

</script>

<style lang="scss" scoped></style>