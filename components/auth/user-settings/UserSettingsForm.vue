<template>
    <BaseUserCard title="Settings" subtitle="Modify Your Account Information">
        <template #content>
            <v-form>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field label="Username" v-model="username"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field label="Email" v-model="email"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </template>
        <template #actions>
            <v-btn color="primary" @click="saveSettings">Save</v-btn>
        </template>
    </BaseUserCard>
</template>
  
<script setup>
import { ref } from 'vue';
const username = ref('');
const email = ref('');
const password = ref('');

const saveSettings = () => {
    // Save settings logic
};
</script>
  
<style scoped></style>