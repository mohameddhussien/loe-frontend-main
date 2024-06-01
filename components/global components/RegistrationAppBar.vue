<template>
    <v-app-bar color="transparent" elevation="0">
        <v-hover #default="{ isHovering, props }">
            <v-app-bar-title>
                <v-container>
                    <v-row v-bind="props" justify="center" no-gutters align="center">
                        <v-slide-x-reverse-transition>
                            <v-btn rounded="circle" icon="mdi-home-outline" @click="navigateTo('/')" v-if="isHovering" class="mx-6" />
                        </v-slide-x-reverse-transition>
                        <v-avatar @click="toggleTheme" image="/Ladies_only_events.jpg" :class="{
                            'avatar': true,
                            'dark-theme': isDark,
                            'light-theme': !isDark
                        }" />
                        <!-- <v-img src="/LOEClipped.png" class="special-img" max-width="50" cover /> -->
                        <v-slide-x-transition>
                            <v-btn rounded="circle" icon="mdi-information-outline" @click="navigateTo('/about')" v-if="isHovering" class="mx-6" />
                        </v-slide-x-transition>
                    </v-row>
                </v-container>
            </v-app-bar-title>
        </v-hover>
    </v-app-bar>
</template>

<script setup>
const { toggleTheme, isDark } = useThemeState()
</script>

<style lang="scss" scoped>
// .special-img {
//     transition: filter 0.3s, transform 0.3s;

//     &:hover {
//         transform: scale(1.05);
//         filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
//     }
// }
</style>