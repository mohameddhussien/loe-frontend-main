<template>
    <booking-base-window title="Booking Details">
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" sm>
                        <p class="text-body-1 text-dark-subtitle">
                            Reservation Information:
                            <strong class="border pa-2 rounded-lg">
                                {{ personCounter.toString() }}
                            </strong>
                        </p>
                    </v-col>
                    <v-col cols="12" sm="auto">
                        <increment-decrement-person no-gutters justify="end" justify-sm="start" class="ga-2" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <booking-details-content />
            </v-col>
        </v-row>
    </booking-base-window>
</template>

<script lang="ts" setup>
const { toggleExpandAll } = useBooking()
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