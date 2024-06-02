<template>
    <booking-details-section-grid :title="title">
        <template #content>
            <v-row>
                <slot name="extra-fields" />
                <v-col cols="4">
                    <v-checkbox hide-details v-model="person.pool" label="Pool" />
                </v-col>
                <v-col cols="4">
                    <v-checkbox hide-details v-model="person.food" label="Food" />
                </v-col>
            </v-row>
        </template>
    </booking-details-section-grid>
</template>

<script lang="ts" setup>
import type { Adult, Child } from '~/classes/person';

const props = defineProps({
    person: {
        type: Object as PropType<Adult | Child>,
        required: true
    },
    title: String
})
</script>

<style lang="scss" scoped></style>