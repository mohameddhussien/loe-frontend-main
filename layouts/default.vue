<template>
    <v-app>
        <AppNavBar />
        <v-main>
            <BookingDetails :dialog-open="isDialogOpen" @save="closeDialogAndSave()" @cancel="cancelCurrentProcess()"
                :event="currentEvent" />
            <slot />
        </v-main>
        <AppFooter />
    </v-app>
</template>

<script setup>
import { currentEvent, isDialogOpen, closeDialogAndSave, cancelCurrentProcess } from '@/composables/dialogActions';
</script>

<style scoped></style>