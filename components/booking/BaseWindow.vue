<template>
    <v-container>
        <v-row>
            <v-col class="header" cols="12">
                <slot name="title" :label="title">
                    <v-card-title>
                        <h3>{{ title }}</h3>
                    </v-card-title>
                    <v-card-subtitle>
                        <p>{{ subtitle }}</p>
                    </v-card-subtitle>
                </slot>
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
    title: String,
    subtitle: String
})

</script>

<style lang="scss" scoped></style>