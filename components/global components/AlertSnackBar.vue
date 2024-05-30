<template>
    <v-snackbar :color="snackbarState.color" v-model="snackbarState.snackbar" :timeout="snackBarOptions.timeout">
        <template #actions>
            <v-btn text @click="snackbarState.snackbar = false">Close</v-btn>
        </template>
        <template #default>
            {{ snackbarState.snackbarText }}
            <v-progress-linear v-model:model-value="snackBarOptions.progress" />
        </template>
    </v-snackbar>
</template>

<script setup>
import { snackbarState, snackBarOptions } from '@/composables/snackBarActions'
</script>

<style lang="scss" scoped></style>