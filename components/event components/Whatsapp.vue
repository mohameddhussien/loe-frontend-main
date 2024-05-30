<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <button class="whatsapp-button" v-bind="props" style="width: 50px;">
                <v-icon icon="mdi-whatsapp" />
            </button>
        </template>
        <v-list>
            <v-list-item v-for="organizer in organizers" prepend-icon="mdi-whatsapp" value="wp"
                :href="`https://wa.me/${organizer.phone}?text=Tell+me+more+about+${event?.EVENT_NAME}+trip`">
                <v-list-item-title>
                    <span>{{ organizer.name }}</span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
import type { EventItem } from '~/composables/store/events';

const props = defineProps({
    event: Object as PropType<EventItem | null>,
})
const organizers = ref([
    { name: "Dalia", phone: "+201001016773" },
    { name: "Rania", phone: "+201001611961" },
    { name: "Menna", phone: "+201150663066" },
])

</script>

<style lang="scss" scoped></style>