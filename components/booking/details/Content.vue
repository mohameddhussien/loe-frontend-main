<template>
    <v-row v-for="(adult, adultIndex) in Adults" :key="`adult-${adultIndex}`" :id="`adult-${adultIndex}`">
        <v-col cols="12" class="section tonal rounded-lg"
            :class="{ 'fade-in-border primary': selectedPerson.adultIndex === adultIndex }">
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
                            <button @click="addChildOfAdult(adultIndex)" class="special-button" :class="addButtonClasses"
                                :disabled="disabledAddAdult" style="width: 100%; height: 48px;">
                                <v-icon icon="mdi-plus" />
                                Add Child
                            </button>
                        </v-col>
                        <v-col cols="12" sm>
                            <v-expand-transition>
                                <v-text-field density="comfortable" v-if="!expandPerson[adultIndex].adult" rounded="lg"
                                    hide-details v-model="adult.name" label="Name" />
                                <h1 v-else>{{ adult.name }}</h1>
                            </v-expand-transition>
                        </v-col>
                    </v-row>
                </template>
                <template #default>
                    <v-col cols="12">
                        <!-- Entertainer Information -->
                        <v-row>
                            <v-col cols="12" md="2">
                                Entertainer Information
                            </v-col>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <field v-model="adult.name" label="Name" />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <field v-model="adult.age" label="Age" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <!-- Contact Information -->
                        <v-row>
                            <v-col cols="12" md="2">
                                Contact Information
                            </v-col>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <v-col cols="12">
                                        <field v-model="adult.email" label="Email" type="email" hint="Optional" />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <field v-model="adult.contact_mandatory" label="Contact 1" type="phone_number" />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <field v-model="adult.contact_optional" label="Contact 2" hint="Optional"
                                            type="phone_number" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <!-- Options Available -->
                        <v-row>
                            <v-col cols="12" md="2">
                                Options Available
                            </v-col>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <v-col cols="4" sm="4">
                                        <v-checkbox hide-details v-model="adult.bus" label="Bus" />
                                    </v-col>
                                    <v-col cols="4" sm="4">
                                        <v-checkbox hide-details v-model="adult.pool" label="Pool" />
                                    </v-col>
                                    <v-col cols="4" sm="4">
                                        <v-checkbox hide-details v-model="adult.food" label="Food" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- Children Section -->
                    <v-col cols="12" v-if="adult.children.length > 0 && adult.children.filter(c => !!c.name)">
                        <v-row>
                            <v-col cols="12" md="2">
                                <p>Children of {{ adult.name.split(' ')[0] }}</p>
                            </v-col>
                            <v-col cols="12" md="10">
                                <v-row v-for="(child, childIndex) in adult.children" :key="`child-${childIndex}`"
                                    :id="`child-${childIndex}`">
                                    <v-col cols="12" class="section lighter rounded-lg" :class="{
                                        'fade-in-border secondary': selectedPerson.childIndex === childIndex
                                    }">
                                        <expand-sections v-model:expanded="expandPerson[adultIndex].children[childIndex].expand">
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
                                                            <v-text-field density="comfortable"
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
                                                <v-row>
                                                    <v-col cols="12" md="2">
                                                        Child Information
                                                    </v-col>
                                                    <v-col cols="12" md="10">
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <field v-model="child.name" label="Child Name" />
                                                            </v-col>
                                                            <v-col cols="12" sm="6">
                                                                <field v-model="child.age" label="Age" />
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <!-- Child Options -->
                                                <v-row>
                                                    <v-col cols="12" md="2">
                                                        Child Options
                                                    </v-col>
                                                    <v-col cols="12" md="10">
                                                        <v-row>
                                                            <v-col cols="6">
                                                                <v-checkbox hide-details v-model="child.food"
                                                                    label="Food" />
                                                            </v-col>
                                                            <v-col cols="6">
                                                                <v-checkbox hide-details v-model="child.pool"
                                                                    label="Pool" />
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </template>
                                        </expand-sections>
                                    </v-col>
                                    <v-col cols="12" v-if="childIndex != adult.children.length - 1">
                                        <v-divider />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </template>
            </expand-sections>
        </v-col>
        <v-col cols="12" v-if="adultIndex != Adults.length - 1">
            <v-divider />
        </v-col>
    </v-row>
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
.v-btn {
    margin-right: 0;
}
</style>