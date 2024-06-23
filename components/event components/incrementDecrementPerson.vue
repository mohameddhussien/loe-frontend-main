<template>
    <v-row dense>
        <v-col cols="auto">
            <button @click="addAdult()" :disabled="disabledAddAdult" class="special-button"
                :class="addButtonClasses(addButtonVariant)" style="width: 50px;">
                <v-icon icon="mdi-menu-up-outline" />
            </button>
        </v-col>
        <v-col cols="auto">
            <button @click="removeLastAdult()" :disabled="disabledRemoveAdult" class="special-button"
                :class="removeButtonClasses(removeButtonVariant)" style="width: 50px;">
                <v-icon icon="mdi-menu-down-outline" />
            </button>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>

const {
    addAdult,
    removeLastAdult,
    disabledAddAdult,
    disabledRemoveAdult,
    addButtonClasses,
    removeButtonClasses
} = useBooking()

const props = defineProps({
    addButtonVariant: {
        type: String as PropType<Variant>,
        default: 'primary-lighter'
    },
    removeButtonVariant: {
        type: String as PropType<Variant>,
        default: 'outline-primary'
    },
})
</script>

<style lang="scss" scoped></style>