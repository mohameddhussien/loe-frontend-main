<template>
    <v-tooltip location="start">
        <template #activator="{ props }">
            <v-icon :color="iconColor" v-bind="props">{{ icon }}</v-icon>
        </template>
        <span>{{ message }}</span>
    </v-tooltip>
</template>

<script setup>
const props = defineProps({
    message: String,
    icon: String,
    iconColor: {
        type: String,
        default: "red"
    }
})
</script>

<style lang="scss" scoped></style>