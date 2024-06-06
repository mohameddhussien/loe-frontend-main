<template>
    <ad-grid class="bg-primary-3 border">
        <swiper-grid title="Just Announced" color="transparent" :breakpoints="comingSoonBreakpoints"
            :items="justAnnouncedEvents">
            <template #default="{ item }">
                <event-card :event="item" />
            </template>
            <template #header-options>
                <v-btn @click="filterToEventStatus('just announced')" :disabled="justAnnouncedEvents.length < 4"
                    variant="tonal">
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

const justAnnouncedEvents = computed(() => events.value.filter(event =>
    event.isJustAnnounced()
).slice(0, 3));

</script>

<style lang="scss" scoped></style>