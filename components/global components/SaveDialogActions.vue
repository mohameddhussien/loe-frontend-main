<template>
    <v-row justify="end" class="ga-2" no-gutters>
        <button @click="saveInfo" :class="{ 'special-button': true, 'disabled': disabled, 'primary': !disabled }"
            :disabled="disabled">
            Done
        </button>
        <button @click="closeDialog" class="special-button outline-secondary">
            Close
        </button>
    </v-row>
</template>

<script lang="ts" setup>
const emit = defineEmits(['save', 'close']);
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
})
const saveInfo = () => {
    emit('save');
};

const closeDialog = () => {
    emit('close');
};
</script>

<style lang="scss" scoped></style>