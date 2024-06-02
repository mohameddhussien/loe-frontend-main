<template>
    <booking-details-content-grid :people="Adults" type="adult" content-variant="tonal" scroll-variant="primary">
        <template #default="{ person: adult, index: adultIndex }">
            <expand-sections v-model:expanded="expandPerson[adultIndex].adult">
                <template #summary>
                    <v-row align="center">
                        <v-col cols="2" sm="auto">
                            <button @click="toggleExpandAdult(adultIndex)" class="special-button outline-secondary"
                                style="width: 48px; height: 48px;">
                                <v-icon>
                                    {{ expandPerson[adultIndex].adult ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                                </v-icon>
                            </button>
                        </v-col>
                        <v-col cols="2" sm="auto">
                            <adult-booking-options class="outline-primary" style="width: 48px; height: 48px;"
                                :index="adultIndex" />
                        </v-col>
                        <v-col cols="8" sm="auto">
                            <button @click="addChildOfAdult(adultIndex)" class="special-button"
                                :class="addButtonClasses('primary-lighter')" :disabled="disabledAddAdult"
                                style="width: 100%; height: 48px;">
                                <v-icon icon="mdi-plus" />
                                Add Child
                            </button>
                        </v-col>
                        <v-col cols="12" sm>
                            <v-expand-transition>
                                <v-text-field variant="solo-filled" density="comfortable"
                                    v-if="!expandPerson[adultIndex].adult" rounded="lg" hide-details v-model="adult.name"
                                    label="Name" />
                                <h1 v-else>{{ adult.name }}</h1>
                            </v-expand-transition>
                        </v-col>
                    </v-row>
                </template>
                <template #default>
                    <v-col cols="12">
                        <!-- Entertainer Information -->
                        <booking-details-entertainer-section title="Entertainer Information" :person="adult"
                            :rules="[required, age, adultAge(18, 65)]" />
                    </v-col>
                    <v-col cols="12">
                        <!-- Contact Information -->
                        <booking-details-contact-section :adult="adult" />
                    </v-col>
                    <v-col cols="12">
                        <!-- Options Available -->
                        <booking-details-options-section title="Options Available" :person="adult">
                            <template #extra-fields>
                                <v-col cols="4" sm="4">
                                    <v-checkbox hide-details v-model="adult.bus" label="Bus" />
                                </v-col>
                            </template>
                        </booking-details-options-section>
                    </v-col>
                    <!-- Children Section -->
                    <v-col cols="12" v-if="adult.children.length > 0 && adult.children.filter((c: any) => !!c.name)">
                        <booking-details-section-grid :title="`Children of ${adult.name.split(' ')[0]}`">
                            <template #content>
                                <booking-details-content-grid :people="adult.children" type="child"
                                    content-variant="lighter" scroll-variant="secondary">
                                    <template #default="{ person: child, index: childIndex }">
                                        <expand-sections
                                            v-model:expanded="expandPerson[adultIndex].children[childIndex].expand">
                                            <template #summary>
                                                <v-row align="center">
                                                    <v-col cols="auto">
                                                        <button @click="toggleExpandChildOfAdult(adultIndex, childIndex)"
                                                            class="special-button outline-secondary"
                                                            style="width: 48px; height: 48px;">
                                                            <v-icon>
                                                                {{
                                                                    expandPerson[adultIndex].children[childIndex].expand
                                                                    ? 'mdi-chevron-down'
                                                                    : 'mdi-chevron-right'
                                                                }}
                                                            </v-icon>
                                                        </button>
                                                    </v-col>
                                                    <v-col cols="auto">
                                                        <adult-booking-options class="outline-primary"
                                                            style="width: 48px; height: 48px;">
                                                            <template #default>
                                                                <v-list-item
                                                                    @click="removeChildOfAdult(adultIndex, childIndex)"
                                                                    prepend-icon="mdi-close" :class="listItemClasses"
                                                                    title="Remove" />
                                                            </template>
                                                        </adult-booking-options>
                                                    </v-col>
                                                    <v-col cols="12" sm>
                                                        <v-expand-transition>
                                                            <v-text-field variant="solo-filled" density="comfortable"
                                                                v-if="!expandPerson[adultIndex].children[childIndex].expand"
                                                                rounded="lg" hide-details v-model="child.name"
                                                                label="Child Name" />
                                                            <h1 v-else>{{ child.name }}</h1>
                                                        </v-expand-transition>
                                                    </v-col>
                                                </v-row>
                                            </template>
                                            <template #default>
                                                <!-- Child Information -->
                                                <booking-details-entertainer-section title="Child Information"
                                                    :person="child" :rules="[required, age, childAge(1, 8)]" />
                                                <!-- Child Options -->
                                                <booking-details-options-section title="Child Options" :person="child" />
                                            </template>
                                        </expand-sections>
                                    </template>
                                </booking-details-content-grid>
                            </template>
                        </booking-details-section-grid>
                    </v-col>
                </template>
            </expand-sections>
        </template>
    </booking-details-content-grid>
</template>

<script lang="ts" setup>
const {
    addChildOfAdult,
    removeChildOfAdult,
    addButtonClasses,
    disabledAddAdult,
    toggleExpandChildOfAdult,
    toggleExpandAdult,
} = useBooking()
const { adultAge, childAge, required, age } = useRules()

const listItemClasses = (): Record<string, boolean> => {
    return {
        'list-style': Adults.length > 1,
        'special-button disabled': Adults.length < 2
    }
}

watch(() => selectedPerson.value, ({ adultIndex, childIndex }) => {
    console.log(adultIndex, childIndex)

    if (adultIndex === undefined || childIndex === undefined) return;

    expandPerson[adultIndex].children[childIndex].expand = true;
    expandPerson[adultIndex].adult = true;
});
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/variables.scss';

:deep(.v-field--variant-solo-filled) {
    box-shadow: none;
    outline: 1px solid var(--border-color);
    transition: $transition;

    &:focus-within {
        outline: 2px solid var(--primary-color-1);
    }
}
</style>