<template>
    <v-menu>
        <template #activator="{ props }">
            <slot name="activator" :props="props">
                <button v-bind="{ ...props, ...$attrs }" class="special-button">
                    <v-icon icon="mdi-menu" />
                </button>
            </slot>
        </template>
        <template #default="{ isActive }">
            <v-list nav>
                <slot>
                    <v-list-item @click="removeSpecificAdult(index)" prepend-icon="mdi-close" :class="listItemClasses"
                        title="Remove" />
                </slot>
            </v-list>
        </template>
    </v-menu>
</template>

<script lang="ts" setup>
const { removeSpecificAdult } = useBooking()

const props = defineProps({
    index: {
        type: Number,
        default: 0
    },
    listItemClasses: Object as PropType<Record<string, boolean>>,
})

</script>

<style scoped></style>