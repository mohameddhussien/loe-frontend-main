<template>
    <v-app>
        <app-side-bar />
        <app-nav-bar />
        <v-main>
            <booking-details :dialog-open="isDialogOpen" @save="closeDialogAndSave()" @cancel="cancelCurrentProcess()"
                :event="currentEvent" />
            <slot />
        </v-main>
        <app-footer />
    </v-app>
</template>

<script setup>
import { currentEvent, isDialogOpen, closeDialogAndSave, cancelCurrentProcess } from '@/composables/dialogActions';
</script>

<style scoped></style>