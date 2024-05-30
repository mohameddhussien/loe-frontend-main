<template>
    <blockquote class="text-2xl font-semibold italic">
        {{ before }}
        <span :class="[`before:block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block`, color]">
            <span class="relative text-white" v-bind="$attrs">{{ toBeDecorated }}</span>
        </span>
        {{ after }}
    </blockquote>
</template>

<script setup>
const props = defineProps({
    before: String,
    toBeDecorated: String,
    after: String,
    color: String | Array
})
</script>

<style lang="scss" scoped></style>