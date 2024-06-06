<template>
    <swiper :modules="modules" :slides-per-view="1" space-between="30" :pagination="{ clickable: true }"
        :breakpoints="breakpoints" navigation>
        <slot />
    </swiper>
</template>

<script lang="ts" setup>
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import type { SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Navigation, Pagination, A11y]
defineProps({
    breakpoints: Object
})
</script>

<style lang="scss" scoped></style>