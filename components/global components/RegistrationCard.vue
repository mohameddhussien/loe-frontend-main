<template>
    <v-container>
        <v-row>
            <!-- <v-col cols="12" lg="5" md="6">
                <v-img :src="img_src" max-width="500" class="rounded-s-sm" />
            </v-col> -->
            <v-col>
                <v-card flat>
                    <v-card-item>
                        <v-card-text>
                            <v-card-title>
                                <h1>{{ title }}</h1>
                            </v-card-title>
                            <v-card-subtitle>
                                <p>{{ subtitle }}</p>
                            </v-card-subtitle>
                        </v-card-text>
                        <slot name="fields" />
                        <v-footer class="d-flex flex-column justify-center">
                            <v-btn :to="toPage" variant="plain" rounded="sm" :ripple="false">
                                {{ toText }}
                            </v-btn>
                        </v-footer>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
    toPage: String,
    toText: String,
    img_src: String
})
</script>

<style scoped>
* {
    font-family: 'Montserrat', sans-serif;
}
</style>