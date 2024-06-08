<template>
    <v-navigation-drawer v-model="isSideBarOpen" :order="1" :width="sideBarWidth" :expand-on-hover="isSideBarOpen" rail>
        <v-list nav>
            <v-list-item>
                <!-- Profile of user! -->
                <template #prepend>
                    <v-avatar :image="isAuthenticated ? 'User avatar' : '/guest-profle-picture.PNG'" />
                </template>
                <template #default>
                    <v-list-item-title class="d-flex justify-space-between align-center">
                        <span>{{ isAuthenticated ? user?.first_name : 'Guest' }}</span>
                        <div class="d-flex ga-2">
                            <button class="theme-button d-flex d-md-none" @click="toggleTheme" />
                            <v-btn @click="toggleSideBar" variant="plain" size="40" rounded="circle" icon="mdi-close" />
                        </div>
                    </v-list-item-title>
                </template>
                <template #append>
                </template>
            </v-list-item>
        </v-list>
        <v-divider />
        <v-list nav density="comfortable">
            <v-list-item rounded="lg" class="list-style" variant="plain" to="/" prepend-icon="mdi-home-outline" title="Home"
                value="home" />
            <v-list-item rounded="lg" class="list-style" variant="plain" to="/events" prepend-icon="mdi-calendar-text"
                title="Events" value="events" />
            <v-list-item rounded="lg" class="list-style" variant="plain" to="/about" prepend-icon="mdi-information-outline"
                title="About Page" value="about" />
        </v-list>
        <template #append>
            <v-list class="d-md-none d-block" nav density="comfortable">
                <v-list-item v-if="!isAuthenticated" rounded="lg" variant="plain" to="/auth/login" prepend-icon="mdi-login"
                    title="Login" value="login" class="list-style" />
                <v-list-item v-if="!isAuthenticated" rounded="lg" to="/auth/register" variant="plain"
                    prepend-icon="mdi-account-multiple" title="Signup" value="signup" class="list-style" />
                <v-list-item v-if="isAuthenticated" rounded="lg" @click="logout()" variant="plain" prepend-icon="mdi-logout"
                    title="Logout" value="logout" class="list-style" />
            </v-list>
            <v-divider />
            <v-list nav density="comfortable">
                <v-list-item :disabled="!isAuthenticated" rounded="lg" class="list-style" variant="plain"
                    to="/auth/user-settings" prepend-icon="mdi-cog-outline" title="Settings" value="settings" />
            </v-list>
            <v-divider />
            <v-list nav>
                <v-list-item>
                    <!-- Profile of user! -->
                    <template #prepend>
                        <v-avatar image="/Ladies_only_events.jpg" />
                    </template>
                    <template #default>
                        <v-list-item-title>
                            <span>Ladies only events</span>
                        </v-list-item-title>
                    </template>
                    <template #append>
                    </template>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { isSideBarOpen, useSideBar } from '~/composables/useSideBar';
const { toggleSideBar } = useSideBar()
const { toggleTheme } = useThemeState()
const { isAuthenticated, logout } = useRegistration()
const { xs } = useDisplay()
const sideBarWidth = computed(() => {
    if (xs.value)
        return 600
    return 300
})

</script>

<style lang="scss" scoped></style>