<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ title }}</h1>
            </v-col>
            <v-col cols="12">
                <slot />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const props = defineProps({
    title: String
})

</script>

<style lang="scss" scoped></style>