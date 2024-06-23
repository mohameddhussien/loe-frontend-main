<template>
    <v-row class="border rounded-xl">
        <v-col class="bg-blue-darken-2 py-10 px-16 rounded-t-lg border-b" cols="12">
            <v-row justify="space-between" align="center">
                <h3 class="text-h3">EGYPT</h3>
                <h3 class="text-h3">مصر</h3>
            </v-row>
        </v-col>
        <v-col class="py-16 px-8 rounded-t-lg" cols="12">
            <v-row justify="space-around" align="center">
                <h2 class="text-h2">{{ plate.split(/\s*-\s*/)[0] }}</h2>
                <v-divider vertical />
                <h2 class="text-h2">{{ plate.split(/\s*-\s*/)[1] }}</h2>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
defineProps({
    plate: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>