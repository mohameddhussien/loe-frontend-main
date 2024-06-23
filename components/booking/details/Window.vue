<template>
    <booking-base-window title="Booking Details">
        <template #title="{ label }">
            <v-row>
                <v-col cols="12" sm>
                    <v-card-title>
                        <h3>{{ label }}</h3>
                    </v-card-title>
                    <v-card-subtitle class="d-flex align-center ga-6 w-100">
                        <span>Reservation Information: </span>
                        <span class="text-h5 text-light-title">{{ personCounter.toString() }}</span>
                    </v-card-subtitle>
                </v-col>
                <v-col cols="12" class="d-flex align-end" sm="auto">
                    <increment-decrement-person no-gutters justify="end" justify-sm="start" class="ga-2"
                        add-button-variant="outline-primary" remove-button-variant="outline-white" />
                </v-col>
            </v-row>
        </template>
        <booking-details-content ref="content" />
    </booking-base-window>
</template>

<script lang="ts" setup>
const { toggleExpandAll } = useBooking()
const content = ref(null)
defineExpose({
    content
})
const handleKeyPress = (event: KeyboardEvent) => {
    if (event.shiftKey && event.altKey && event.key === 'J') {
        console.log("Ctrl+J pressed");
        toggleExpandAll(false)
    }
    if (event.shiftKey && event.altKey && event.key === 'L') {
        console.log("Ctrl+L pressed");
        toggleExpandAll(true)
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style lang="scss" scoped></style>