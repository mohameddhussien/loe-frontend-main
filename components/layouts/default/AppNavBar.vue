<template>
    <v-app-bar elevation="0" :order="2" color="rgba(255,255,255,0.5)" class="border">
        <v-app-bar-nav-icon>
            <v-btn icon="mdi-menu" @click="toggleSideBar" />
        </v-app-bar-nav-icon>
        <v-app-bar-title>
            <v-avatar image="/Ladies_only_events.jpg" />
            <!-- <img @click="toggleTheme" src="/Ladies_only_events.jpg" :class="{
                'theme-changer': true,
                'theme-changer-light': !theme.global.current.value.dark,
                'theme-changer-dark': theme.global.current.value.dark
            }"> -->
            <!-- <v-img src="/loelogo.png" :min-width="150" :max-width="200" :max-height="60" class="ma-2 d-none d-md-flex" aspect-ratio="2/1"
            cover /> -->
        </v-app-bar-title>
        <template #append>
            <v-container fluid>
                <v-row class="ga-2" align="center">
                    <search-bar :open-search-bar="openSearch" @close="openSearch = false" />
                    <button class="theme-button d-md-flex d-none" @click="toggleTheme" />
                    <v-btn variant="plain" color="primary" tile class="rounded" @click="openSearch = true"
                        icon="mdi-calendar-search" />
                    <v-btn variant="plain" color="primary" tile to="/auth/register" v-if="!authenticated"
                        class="d-md-flex d-none rounded" icon="mdi-account-plus" />
                    <v-btn variant="tonal" color="primary" tile to="/auth/login" v-if="!authenticated"
                        class="d-md-flex d-none rounded" icon="mdi-login" />
                    <v-btn variant="plain" color="primary" tile v-if="authenticated" @click="async () => await logout()"
                        class="d-md-flex d-none rounded" icon="mdi-logout" />
                </v-row>
            </v-container>
        </template>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { logout, hasToken as authenticated } from '@/composables/store/session';
const { toggleTheme } = useThemeState()
const { toggleSideBar } = useSideBar()
const openSearch = ref(false)

</script>

<style lang="scss" scoped></style>