<template>
    <booking-details-section-grid :title="title">
        <template #content>
            <v-row>
                <v-col cols="12" sm="6">
                    <field v-model="person.name" :rules="[required]" label="Name" aria-label="Name" />
                </v-col>
                <v-col cols="12" sm="6">
                    <field v-model="person.age" :rules="rules" label="Age" aria-label="Age" />
                </v-col>
            </v-row>
        </template>
    </booking-details-section-grid>
</template>

<script lang="ts" setup>
import type { Adult, Child } from '~/classes/person';
const { required } = useRules()

const props = defineProps({
    person: {
        type: Object as PropType<Adult | Child>,
        required: true
    },
    rules: {
        type: Object as PropType<Rules>,
        default: []
    },
    title: String
})
</script>

<style lang="scss" scoped></style>