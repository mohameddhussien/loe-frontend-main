<template>
    <v-row align="center">
        <v-col cols="2" sm="auto">
            <button v-tooltip="!isExpanded ? 'Expand' : 'Collapse'" @click="handleToggleExpand"
                class="special-button outline-secondary" style="width: 48px; height: 48px;">
                <v-icon v-if="isExpanded" icon="mdi-chevron-down" />
                <v-icon v-else icon="mdi-chevron-right" />
            </button>
        </v-col>
        <v-col cols="2" sm="auto">
            <button @click="handleRemovePerson" style="width: 48px; height: 48px;" v-tooltip="'Remove'"
                class="outline-primary special-button">
                <v-icon icon="mdi-delete-outline" />
            </button>
        </v-col>
        <slot name="extra-option" />
        <v-col cols="12" sm>
            <v-expand-transition>
                <v-text-field variant="solo-filled" density="comfortable" v-if="!isExpanded" :rules="[required]"
                    rounded="lg" hide-details aria-label="Name" :model-value="name" @update:model-value="handleChangeName"
                    label="Name" />
                <h1 class="text-h4" v-else>{{ name }}</h1>
            </v-expand-transition>
        </v-col>
    </v-row>
</template>
  
<script lang="ts" setup>
const { required } = useRules()
const props = defineProps({
    isExpanded: { type: Boolean, required: true },
    name: { type: String, required: true },
});

const emits = defineEmits(['toggle-expand', 'update:name', 'remove-person']);

const handleRemovePerson = () => {
    emits('remove-person');
};

const handleChangeName = (val: string) => {
    emits('update:name', val);
};

const handleToggleExpand = () => {
    emits('toggle-expand');
};
</script>
  
<style scoped>
.special-button {
    width: 48px;
    height: 48px;
}
</style>
  