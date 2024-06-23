<template>
    <!-- Bottom Navigation -->
    <v-hover #default="{ isHovering, props: hoverProps }">
        <v-bottom-navigation v-bind="hoverProps" :height="calculateHeight(isHovering)" :active="bottomNav"
            class="elevation-20">
            <v-container>
                <v-row justify="center">
                    <v-col class="d-flex justify-end">
                        <button @click="holdNav = !holdNav"
                            v-tooltip:left="`Click To ${!holdNav ? 'Lock' : 'Unlock'} Bottom Navigation.`"
                            class="special-button outline-primary" style="width: 40px; height: 40px;">
                            <v-icon icon="mdi-arrow-up-circle" />
                        </button>
                    </v-col>
                    <v-col class="d-flex justify-start">
                        <button
                            v-tooltip:right="`Right-click To ${!fullScreen ? 'Activate' : 'Deactivate'} Full-screen Mode.`"
                            @click="fullScreen = !fullScreen" style="width: 40px; height: 40px;"
                            class="special-button primary">
                            <v-icon icon="mdi-fullscreen" />
                        </button>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-card-title>
                        <h3>Total: {{ event?.price }}EGP</h3>
                    </v-card-title>
                </v-row>
                <v-row>
                    <v-divider class="border-opacity-100" />
                    <booking-table @edit="editItem" @delete="deleteItem" :event="event" :people="Adults"
                        :disable-actions-on="(!holdNav && !fullScreen)" :itemsPerPage="itemsPerPage" />
                </v-row>
            </v-container>
        </v-bottom-navigation>
    </v-hover>
</template>

<script lang="ts" setup>
import { LOEEvent } from '~/classes/Event';

const { removeSpecificAdult, removeChildOfAdult, scrollToPerson, selectPerson } = useBooking()
const emits = defineEmits(['edit', 'delete'])
const props = defineProps({
    event: Object as PropType<LOEEvent>,
})
//  Variable Declaration
const itemsPerPage = ref(1)
const bottomNav = ref(true)
const holdNav = ref(false)
const fullScreen = ref(false)

//  Method Declaration
const updateNavAndTableItemsStates = (items: number, holdNavState: boolean, fullScreenState: boolean, bottomNavHeight: number) => {
    itemsPerPage.value = items;
    holdNav.value = holdNavState;
    fullScreen.value = fullScreenState;
    return bottomNavHeight
};

const editItem = (adult_index?: number, child_index?: number) => {
    console.log("Edit: ", adult_index, child_index, '\n')
    fullScreen.value = false
    holdNav.value = false
    scrollToPerson(adult_index, child_index)
    selectPerson(adult_index, child_index)
}
const deleteItem = (adult_index?: number, child_index?: number) => {
    console.log("Delete: ", adult_index, child_index, '\n')
    if (!child_index && adult_index)
        removeSpecificAdult(adult_index)
    else if (child_index && adult_index)
        removeChildOfAdult(adult_index, child_index)
}

const calculateHeight = (isHovering: boolean | null) => {
    if (holdNav.value && fullScreen.value)
        return updateNavAndTableItemsStates(5, false, fullScreen.value, window.innerHeight);
    if (holdNav.value)
        return updateNavAndTableItemsStates(1, holdNav.value, false, 300);
    if (fullScreen.value)
        return updateNavAndTableItemsStates(3, false, fullScreen.value, window.innerHeight);
    return updateNavAndTableItemsStates(1, holdNav.value, fullScreen.value, isHovering ? 300 : 100);
};

</script>

<style lang="scss" scoped>
.v-bottom-navigation {
    transition: transform, color, 0.5s, 0.3s cubic-bezier(0, 0, 0.07, 1) !important;
}

* {
    font-family: 'Rethink Sans', sans-serif;
}
</style>