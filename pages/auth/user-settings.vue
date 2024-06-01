<template>
    <v-container fluid>
        <v-row class="ma-2 ga-6">
            <v-col class="section lighter" cols="12" sm="4" md="3" xxl="1">
                <v-list nav bg-color="transparent">
                    <v-list-item prepend-icon="mdi-cog-outline" :title="tabs[activeTab]" />
                </v-list>
                <v-tabs v-model="activeTab" rounded="lg" direction="vertical">
                    <v-tab v-for="(tab, index) in tabs" :key="index">{{ tab }}</v-tab>
                </v-tabs>
            </v-col>
            <v-col class="section outline-grey">
                <v-tabs-window v-model="activeTab">
                    <v-tabs-window-item>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12">
                                    <user-avatar />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tabs-window-item>

                    <v-tabs-window-item>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12">
                                    <user-settings-form />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tabs-window-item>

                    <v-tabs-window-item>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12">
                                    <user-notifications />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts" setup>
const activeTab = ref(0);
const tabs = ref(['User Avatar', 'User Settings', 'Notify Preferences'])
</script>
  
<style lang="scss" scoped></style>
  