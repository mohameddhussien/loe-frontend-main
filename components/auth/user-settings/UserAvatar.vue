<template>
    <BaseUserCard title="Avatar" subtitle="Change Your Display Picture">
        <template #content>
            <v-row no-gutters>
                <v-avatar size="100" image="https://via.placeholder.com/100" />
            </v-row>
        </template>
        <template #actions>
            <v-btn class="mt-2" @click="uploadAvatar">Upload New Avatar</v-btn>
        </template>
    </BaseUserCard>
</template>
  
<script setup>
const uploadAvatar = () => {
    // Upload avatar logic
};
</script>
  
<style scoped></style>
  