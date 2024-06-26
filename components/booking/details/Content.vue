<template>
    <v-form validate-on="lazy submit" ref="form">
        <booking-details-content-grid :people="Adults" type="adult" content-variant="tonal" scroll-variant="primary">
            <template #default="{ person: adult, index: adultIndex }">
                <expand-sections v-model:expanded="expandPerson[adultIndex].adult">
                    <template #summary>
                        <booking-details-summary :is-expanded="expandPerson[adultIndex].adult" v-model:name="adult.name"
                            @remove-person="removeSpecificAdult(adultIndex)" @toggle-expand="toggleExpandAdult(adultIndex)">
                            <template #extra-option>
                                <v-col cols="8" sm="auto">
                                    <button @click="addChildOfAdult(adultIndex)" class="special-button"
                                        :class="addButtonClasses('primary-lighter')" :disabled="disabledAddAdult"
                                        style="width: 100%; height: 48px;">
                                        <v-icon icon="mdi-plus" />
                                        Add Child
                                    </button>
                                </v-col>
                            </template>
                        </booking-details-summary>
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
                                                    <booking-details-summary
                                                        :is-expanded="expandPerson[adultIndex].children[childIndex].expand"
                                                        v-model:name="child.name"
                                                        @remove-person="removeChildOfAdult(adultIndex, childIndex)"
                                                        @toggle-expand="toggleExpandChildOfAdult(adultIndex, childIndex)" />
                                                </template>
                                                <template #default>
                                                    <!-- Child Information -->
                                                    <booking-details-entertainer-section title="Child Information"
                                                        :person="child" :rules="[required, age, childAge(1, 8)]" />
                                                    <!-- Child Options -->
                                                    <booking-details-options-section title="Child Options"
                                                        :person="child" />
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
    </v-form>
</template>

<script lang="ts" setup>
const form = ref(null)
defineExpose({
    form
})
const {
    addChildOfAdult,
    removeChildOfAdult,
    addButtonClasses,
    disabledAddAdult,
    toggleExpandChildOfAdult,
    toggleExpandAdult,
    removeSpecificAdult
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