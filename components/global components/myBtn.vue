<template>
    <v-hover #default="{ isHovering, props: hoverProps }">
        <v-btn @click="emits('click')" variant="outlined" v-bind="{ ...hoverProps, ...otherProps, ...$attrs }"
            :class="{ 'ma-0': true, [`scale-105 ${onHover}`]: isHovering, [`bg-${bgColor}`]: !isHovering, '!border !border-black/25': border }"
            :size="size" :href="href" :to="to">
            <v-icon v-if="icon" :icon="icon" />
            <slot v-else />
        </v-btn>
    </v-hover>
</template>
<script lang="ts" setup>
const emits = defineEmits(['click'])
const props = defineProps({
    size: {
        type: [String, Number] as PropType<any>,
        default: 'default',
    },
    icon: {
        type: String,
        default: undefined,
    },
    otherProps: Object,
    href: String,
    bgColor: String,
    to: {
        type: String,
        default: undefined
    },
    onHover: {
        type: String,
        default: 'bg-pink-accent-2 text-white'
    },
    border: {
        type: Boolean,
        default: true
    }
});
</script>

<style lang="scss" scoped></style>