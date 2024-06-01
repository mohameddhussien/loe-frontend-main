<template>
    <v-card flat class="bg-transparent" :class="additionalClasses">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        <v-container>
            <slot name="content"></slot>
        </v-container>
        <v-card-actions>
            <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    additionalClasses: {
        type: String,
        default: ''
    }
});
</script>
  
<style scoped></style>
  