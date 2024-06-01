<template>
    <v-app class="bg-primary-3">
        <registration-app-bar />
        <v-main>
            <slot></slot>
        </v-main>
    </v-app>
</template>
<script setup>
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}
</style>