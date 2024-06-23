<template>
    <v-row>
        <v-col cols="12">
            <slot name="summary" :isExpanded="ref(expanded)" />
        </v-col>
        <v-expand-transition>
            <v-col cols="12" v-show="expanded">
                <slot />
            </v-col>
        </v-expand-transition>
    </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
    expanded: Boolean,
})
</script>

<style lang="scss" scoped></style>