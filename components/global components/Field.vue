<template>
    <v-text-field :model-value="value" @update:model-value="emits('update:modelValue', $event)" clearable clear-icon="mdi-close" />
</template>

<script lang="ts" setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    value: [String, Number, Boolean, Object, Array, null] as PropType<any>,
})
</script>

<style lang="scss" scoped></style>