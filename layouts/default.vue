<template>
    <v-app>
        <app-side-bar />
        <app-nav-bar />
        <v-main>
            <booking-details :dialog-open="isDialogOpen" @save="saveDialog" @cancel="cancelDialog" />
            <slot />
        </v-main>
        <app-footer />
    </v-app>
</template>

<script lang="ts" setup>
const { saveDialog, cancelDialog } = useDialog()
</script>

<style scoped></style>