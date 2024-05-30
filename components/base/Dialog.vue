<template>
    <v-dialog :persistent="persistent" :model-value="dialogOpen" @update:modelValue="closeDialog()" :fullscreen="fullscreen"
        :width="width" :transition="transition">
        <v-card :color="color" :elevation="elevate">
            <slot name="title">
                <v-card-title>
                    <v-btn variant="text" :ripple="false" icon="mdi-close" @click="closeDialog()" />
                    <span>{{ title }} {{ decoratedText }}</span>
                </v-card-title>
            </slot>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" class="booking-container">
                        <slot />
                    </v-col>
                    <v-col v-if="showFooter" cols="12">
                        <v-row justify="end" class="ga-2" no-gutters>
                            <button @click="saveInfo"
                                :class="{ 'special-button': true, 'disabled': disabled, 'primary': !disabled }"
                                :disabled="disabled">Done</button>
                            <button @click="closeDialog" class="special-button outline-secondary">Close</button>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
const emits = defineEmits(['close', 'assign'])
const props = defineProps({
    dialogOpen: Boolean,
    message: String,
    persistent: Boolean,
    transition: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    fullscreen: Boolean,
    width: { type: String, default: '500' },
    elevate: { type: Number, default: 4 },
    color: { type: String, default: 'white' },
    title: { type: String, default: '' },
    decoratedText: { type: String, default: '' },
    icon: { type: String, default: '' },
    showFooter: { type: Boolean, default: true }
})

const saveInfo = () => {
    emits('assign', false)
    closeDialog()
}
const closeDialog = () => {
    emits('close', false)
}
</script>

<style lang="scss" scoped></style>