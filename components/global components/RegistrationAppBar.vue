<template>
    <v-app-bar color="transparent" elevation="0">
        <v-hover #default="{ isHovering, props }">
            <v-app-bar-title>
                <v-container>
                    <v-row v-bind="props" justify="center" no-gutters align="center">
                        <v-slide-x-reverse-transition>
                            <button @click="navigateTo('/')" v-if="isHovering" class="pa-2 ma-2">
                                <v-icon icon="mdi-home-outline" />
                            </button>
                        </v-slide-x-reverse-transition>
                        <v-img src="/LOEClipped.png" class="special-img" max-width="50" cover />
                        <v-slide-x-transition>
                            <button @click="navigateTo('/about')" v-if="isHovering" class="pa-2 ma-2">
                                <v-icon icon="mdi-account-outline" />
                            </button>
                        </v-slide-x-transition>
                    </v-row>
                </v-container>
            </v-app-bar-title>
        </v-hover>
    </v-app-bar>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.special-img {
    transition: filter 0.3s, transform 0.3s;

    &:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
    }
}
</style>