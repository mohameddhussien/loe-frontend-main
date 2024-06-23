<template>
    <v-col cols="12">
        <v-card flat v-bind="$attrs" :border="border" :color="color" width="100%">
            <v-card-text>
                <slot name="header">
                <v-card-title class="d-flex justify-space-between">
                    <h4 class="text-h4">{{ title }}</h4>
                    <slot name="header-options" />
                </v-card-title>
                </slot>
                <my-swiper :breakpoints="breakpoints">
                    <template v-for="(item, key) in items" :key="key">
                         <!-- @click="clickedSlide(item)" -->
                        <swiper-slide class="pb-10">
                            <slot :item="item" />
                        </swiper-slide>
                    </template>
                </my-swiper>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script lang="ts" setup>
import { SwiperSlide } from 'swiper/vue';

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
    title: { type: String, default: '' },
    items: { type: Array as PropType<Array<any>>, default: [] },
    color: { type: String, default: undefined },
    border: { type: Boolean, default: false },
    breakpoints: { type: Object }
})
</script>

<style lang="scss" scoped>
.swiper-slide {
    display: flex;
    justify-content: center;
}
</style>