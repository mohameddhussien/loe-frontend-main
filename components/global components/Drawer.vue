<template>
    <v-navigation-drawer :order="1" width="300" :model-value="openNav" @update:model-value="emits('update:modelValue', $event)" expand-on-hover rail>
        <slot />
    </v-navigation-drawer>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>