<template>
    <v-navigation-drawer v-model="isSideBarOpen" :order="1" width="300" expand-on-hover rail>
        <v-list nav>
            <v-list-item>
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
            <v-list class="d-md-none d-block">
                <v-list-item v-if="!authenticated" variant="plain" to="/auth/login" prepend-icon="mdi-login" title="Login"
                    value="login" class="list-style" />
                <v-divider v-if="!authenticated" />
                <v-list-item v-if="!authenticated" to="/auth/register" variant="plain" prepend-icon="mdi-account-multiple"
                    title="Signup" value="signup" class="list-style" />
                <v-list-item v-if="authenticated" @click="logout()" variant="plain" prepend-icon="mdi-logout" title="Logout"
                    value="logout" class="list-style" />
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { logout, hasToken as authenticated } from '@/composables/store/session';
import { isSideBarOpen } from '~/composables/useSideBar';
const { toggleTheme } = useThemeState()
</script>

<style lang="scss" scoped></style>