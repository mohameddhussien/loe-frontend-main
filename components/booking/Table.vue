<template>
    <v-data-table hover :items="people" :headers="headers" v-model:expanded="expanded" show-expand items-per-page-text=""
        item-value="name">
        <template #item.sequential_number="{ index }">{{ index + 1 }}</template>
        <template #item.bus="{ value }">
            <v-icon v-if="value" icon="mdi-checkbox-outline" />
            <v-icon v-else icon="mdi-close-box-outline" />
        </template>
        <template #item.pool="{ value }">
            <v-icon v-if="value" icon="mdi-checkbox-outline" />
            <v-icon v-else icon="mdi-close-box-outline" />
        </template>
        <template #item.food="{ value }">
            <v-icon v-if="value" icon="mdi-checkbox-outline" />
            <v-icon v-else icon="mdi-close-box-outline" />
        </template>
        <template #item.actions="{ item, index: adult_index }">
            <v-menu location="right bottom">
                <template #activator="{ props }">
                    <v-btn :disabled="disabled" size="20" :ripple="false" variant="plain" icon="mdi-cog-outline"
                        v-bind="props" />
                </template>
                <v-list density="compact">
                    <v-list-item v-for="(action, i_index) in actions"
                        @click="optionFunction(i_index, adult_index, undefined)" :ripple="false" :key="i_index"
                        :prepend-icon="`mdi-${action.icon}`" :title="action.label">
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        <template #item.data-table-expand="{ toggleExpand, isExpanded, item, internalItem, index }">
            <v-btn :disabled="!item.children.length || disabled" :ripple="false" class="px-2"
                :class="{ 'text-primary': isExpanded(internalItem) }" size="30"
                @click="toggleExpansion(toggleExpand, internalItem, index)"
                :icon="expandableIcon(item, internalItem, isExpanded)" variant="tonal" />
        </template>
        <template #expanded-row="{ columns, item: adult, isExpanded }">
            <tr class="border-t" v-for="(child, child_index) of adult?.children" :key="child_index">
                <td><v-icon icon="mdi-arrow-right" /></td>
                <td>
                    <span v-if="child.name">{{ child.name }}</span>
                    <v-chip v-else>Unnamed</v-chip>
                </td>
                <td>{{ child.age }}</td>
                <td>
                    <v-icon v-if="adult.bus" icon="mdi-checkbox-outline" />
                    <v-icon v-else icon="mdi-close-box-outline" />
                </td>
                <td>
                    <v-icon v-if="child.pool" icon="mdi-checkbox-outline" />
                    <v-icon v-else icon="mdi-close-box-outline" />
                </td>
                <td>
                    <v-icon v-if="child.food" icon="mdi-checkbox-outline" />
                    <v-icon v-else icon="mdi-close-box-outline" />
                </td>
                <td class="text-center">
                    <v-icon icon="mdi-close" size="20" />
                </td>
                <td class="text-center" :colspan="columns.length">
                    <v-menu location="right bottom">
                        <template #activator="{ props }">
                            <v-btn :disabled="disabled" size="20" :ripple="false" variant="plain" icon="mdi-cog-outline"
                                v-bind="props" />
                        </template>
                        <v-list>
                            <v-list-item v-for="(action, action_index) in actions"
                                @click="optionFunction(action_index, Adults.indexOf(adult), child_index)" :ripple="false"
                                :key="action_index" :prepend-icon="`mdi-${action.icon}`" :title="action.label">
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </td>
            </tr>
        </template>
        <template #footer.prepend>
            <v-item-group class="mr-auto">
                <button class="special-button primary" @click="purchaseEvent(event)">
                    Proceed to Purchase
                </button>
            </v-item-group>
        </template>
    </v-data-table>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Adult } from '~/classes/person';

const { purchaseEvent, toggleExpandAdult } = useBooking()

const emits = defineEmits<{
    'edit': [number | undefined, number | undefined];
    'delete': [number | undefined, number | undefined];
}>();
const props = defineProps({
    event: Object,
    people: { type: Object as PropType<Adult[]>, default: [] },
    disableActionsOn: Boolean,
})
const disabled = computed(() => props.disableActionsOn)
const expanded = ref([])
const actions = [
    { icon: 'pencil-outline', label: 'Edit', emit: 'edit' },
    { icon: 'delete-sweep-outline', label: 'Delete', emit: 'delete' },
]

const headers = [
    { title: 'S.N', value: 'sequential_number' },
    { title: 'Adult Name', value: 'name' },
    { title: 'Age', value: 'age' },
    { title: 'Booked Bus', value: 'bus' },
    { title: 'Pool', value: 'pool' },
    { title: 'Food', value: 'food' },
    { title: 'Children', key: 'data-table-expand', align: 'center', width: 2 },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
];
const optionFunction = (option_index: number, adult_index?: number, child_index?: number) => {
    if (option_index == 0) {
        editItem(adult_index, child_index)
        return
    }
    deleteItem(adult_index, child_index)
}
const editItem = (adult_index?: number, child_index?: number) => {
    emits('edit', adult_index, child_index)
}
const deleteItem = (adult_index?: number, child_index?: number) => {
    emits('delete', adult_index, child_index)
}
const expandableIcon = (item: Adult, internalItem: any, isExpanded: Function) => {
    if (item.children.length)
        return isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down';
    return 'mdi-close';
};
const toggleExpansion = (toggleExpand: Function, internalItem: any, index: number) => {
    toggleExpandAdult(index)
    toggleExpand(internalItem)
}
</script>

<style lang="scss" scoped></style>