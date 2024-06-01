<template>
    <v-footer elevation="20" class="bg-primary-3">
        <v-row justify="center" class="ga-2" no-gutters>
            <v-btn v-for="link in links" :key="link" :to="link.to" variant="text" rounded="pill">
                {{ link.label }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>Ladies only events</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script setup>
const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
]
</script>

<style scoped></style>