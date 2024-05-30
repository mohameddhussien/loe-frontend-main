<template>
    <v-row dense>
        <v-col cols="auto">
            <button @click="addAdult()" :disabled="disabledAddAdult" class="special-button" :class="addButtonClasses"
                style="width: 50px;">
                <v-icon icon="mdi-menu-up-outline" />
            </button>
        </v-col>
        <v-col cols="auto">
            <button @click="removeLastAdult()" :disabled="disabledRemoveAdult" class="special-button"
                :class="removeButtonClasses" style="width: 50px;">
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

</script>

<style lang="scss" scoped></style>