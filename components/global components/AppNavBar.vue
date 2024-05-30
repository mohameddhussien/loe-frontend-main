<template>
    <drawer v-model="openNav">
        <v-list nav>
            <v-list-item >
                <!-- Profile of user! -->
                <template #prepend>
                    <v-avatar image="/Ladies_only_events.jpg" />
                </template>
                <template #default>
                    <v-list-item-title class="d-flex justify-space-between align-center">
                        <span>Ladies only events</span>
                        <button class="theme-button d-flex d-md-none" @click="toggleTheme" />
                    </v-list-item-title>
                </template>
                <template #append>
                </template>
            </v-list-item>
        </v-list>
        <v-list>
            <v-list-item class="list-style" variant="plain" to="/" prepend-icon="mdi-home-outline" title="Home"
                value="home" />
            <v-divider />
            <v-list-item class="list-style" variant="plain" to="/events" prepend-icon="mdi-calendar-text" title="Events"
                value="events" />
            <v-divider />
            <v-list-item class="list-style" variant="plain" to="/about" prepend-icon="mdi-information-outline"
                title="About Page" value="about" />
        </v-list>
        <template #append>
            <v-list nav>
                <v-list-item v-if="!authenticated" to="/login" prepend-icon="mdi-login" title="Login" value="login"
                    class="font-sans d-md-none d-flex" />
                <v-list-item v-if="!authenticated" to="/register" prepend-icon="mdi-account-multiple" title="Signup"
                    value="signup" class="font-sans d-md-none d-flex" />
                <v-list-item v-if="authenticated" @click="logout()" prepend-icon="mdi-logout" title="Logout" value="logout"
                    class="font-sans d-md-none d-flex" />
            </v-list>
        </template>
    </drawer>
    <v-app-bar elevation="0" :order="2" color="rgba(255,255,255,0.5)" class="border">
        <v-app-bar-nav-icon>
            <v-btn icon="mdi-menu" @click="openNav = !openNav" />
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

<script setup>
import { useTheme } from 'vuetify'
import { logout, hasToken as authenticated } from '@/composables/store/session';
const theme = useTheme()

const openSearch = ref(false)
const openNav = ref(false)

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    document.body.classList.toggle('dark-theme');
}
</script>

<style lang="scss" scoped></style>