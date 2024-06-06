

<template>
    <BaseDialog :elevate="0" color="transparent" width="700" :persistent="true" :dialog-open="opened"
        @close="emits('close')" transition="slide-y">
        <template #title>
            <v-autocomplete menu-icon="mdi-menu-swap-outline" v-model="searchtext" bg-color="pink-accent-2"
                :hide-details="true" variant="solo" clear-icon="mdi-close-circle-outline" clearable rounded
                label="Search for a trip.." :items="eventNames" return-object>
                <template #prepend>
                    <my-btn bg-color="pink-accent-1" @click="emits('close')" icon="mdi-close" />
                </template>
                <template #label="{ label }">
                    <span class="font-bold text-md font-sans">{{ label }}</span>
                </template>
                <template #no-data>
                    <p class="text-center font-bold text-2xl font-sans">No Data Found!</p>
                </template>
            </v-autocomplete>
        </template>
        <div></div>
    </BaseDialog>
</template>

<script lang="ts" setup>
import { useEvents } from '@/composables/useEvents'
const { initializeStates } = useEvents()
await initializeStates();

const eventNames = computed(() => events.value?.map((event: any) => event.e_name))

const emits = defineEmits(['close'])
const props = defineProps({
    openSearchBar: Boolean,
})
const opened = ref(props.openSearchBar);

watchEffect(() => {
    opened.value = props.openSearchBar;
});
const searchtext = ref('')
</script>

<style lang="scss" scoped></style>