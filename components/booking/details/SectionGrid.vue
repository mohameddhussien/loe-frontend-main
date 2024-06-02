<template>
    <v-row>
        <v-col cols="12" md="2">
            {{ title }}
        </v-col>
        <v-col cols="12" md="10">
            <slot name="content" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: { type: String, default: '' }
})
</script>

<style lang="scss" scoped></style>