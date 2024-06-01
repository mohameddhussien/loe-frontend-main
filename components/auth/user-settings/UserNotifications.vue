<template>
    <BaseUserCard title="Notifications" subtitle="Manage Your Notification Preferences">
        <template #content>
            <v-checkbox label="Email Notifications" v-model="emailNotifications"></v-checkbox>
            <v-checkbox label="SMS Notifications" v-model="smsNotifications"></v-checkbox>
        </template>
    </BaseUserCard>
</template>
  
<script setup>
import { ref } from 'vue';
const emailNotifications = ref(false);
const smsNotifications = ref(false);
</script>
  
<style scoped></style>
  