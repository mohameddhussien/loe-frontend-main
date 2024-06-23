<template>
    <v-row>
        <v-col id="alert" cols="12">
            <v-alert v-if="errors.length" title="Alert title" :text="errorMessages" type="error" variant="tonal" />
        </v-col>
        <v-col cols="12">
            <v-stepper v-model="step" class="elevation-0 rounded-lg" :mobile="mobile"
                :items="['Booking Details', 'Bus Reservation', 'Other Activities']">
                <template #item.1>
                    <booking-details-window ref="details" />
                </template>
                <!-- <v-stepper-item :rules="[() => adultsWithBus.length > 0]"></v-stepper-item> -->
                <template #item.2>
                    <reservation-window :event="event" />
                </template>
                <template #item.3>
                    <h1 class="text-4xl font-bold mb-4">Other Activities</h1>
                </template>
                <template #actions="{ next, prev }">
                    <v-stepper-actions>
                        <template #next>
                            <my-btn @click="checkPersonReservationRules(next)" :border="false"
                                prepend-icon="mdi-arrow-right" on-hover="bg-pink-accent-1">Next
                                Step</my-btn>
                        </template>
                        <template #prev>
                            <my-btn @click="checkPersonReservationRules(prev)" :border="false" prepend-icon="mdi-arrow-left"
                                on-hover="bg-pink-accent-1">Previous Step</my-btn>
                        </template>
                    </v-stepper-actions>
                </template>
            </v-stepper>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { LOEEvent } from '~/classes/Event';

defineProps({
    event: Object as PropType<LOEEvent>
})
const { scrollToElement } = useBooking()
const { mobile } = useDisplay()
const step = ref()
const details = ref()
const errors = ref<any>([])
const errorMessages = computed(() => {
    return errors.value?.map((error: any) => {
        return `${error.label}: ${error.errorMessages.join(', ')}`;
    }).join('\n');
});
const adultsWithBus = computed(() => Adults.filter(a => a.bus))

const checkPersonReservationRules = async (goToStep: () => void) => {
    if (step.value == 1) {
        const form = details.value.content.form
        errors.value = []
        await form.validate()

        if (form.isValid)
            return checkReservation(goToStep)
        errors.value = form.errors
        errors.value.forEach((error: any, index: number) => {
            const inputElement = document.getElementById(error.id)
            const label = inputElement ? inputElement.getAttribute('aria-label') : 'Unknown field';
            errors.value[index].label = label;
        })
        scrollToElement('alert')
    }
    if (step.value == 2) {
        goToStep()
    }
    if (step.value == 3) {
        adultsWithBus.value.length == 0 ? goToStep() : ''
        goToStep()
    }
}
const checkReservation = (goToStep: () => void) => {
    adultsWithBus.value.length == 0 ? goToStep() : ''
    goToStep()
}
</script>

<style scoped></style>