<template>
    <v-list class="pa-0 ma-0 mt-1" nav bg-color="transparent">
        <v-list-item-title class="pa-0 ma-0 mt-1">
            <div class="d-flex gap-x-3">
                <v-tooltip text="Show/Hide Details">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" :ripple="false" class="font-sans pa-1" size="x-large"
                            @click="emits('show-details', !person.showDetails)"
                            :prepend-icon="person.showDetails ? 'mdi-arrow-down-drop-circle-outline' : 'mdi-arrow-right-drop-circle-outline'">
                            {{ label }} {{ index + 1 }}
                        </v-btn>
                    </template>
                </v-tooltip>
                <slot name="remove">
                </slot>
            </div>
        </v-list-item-title>
        <v-list-item nav class="pa-0 ma-0 mt-1">
            <div class="d-flex">
                <slot name="options">
                </slot>
            </div>
            <div class="d-flex flex-wrap gap-x-2">

                <v-text-field class="pt-2" v-model="person.name"
                    :rules='[(name) => name.match(/^[a-zA-Z_ ]|^[\u0621-\u064A\u0660-\u0669 ]*$/g) ? true : "Enter a proper name!"]'
                    variant="outlined" :label="`${label} name`" />
                <v-text-field class="pt-2 max-w-[15rem]" v-model="person.age" variant="outlined"
                    :rules='[(age) => age.match(/^[0-9]*$/g) ? (label == "Child" ? (age >= 8 ? `Max age is ${8}!` : (age < 1 ? "Invalid Age!" : age = parseInt(age), true)) : (age < 9 ? `Min age is ${9}!` : (age < 1 ? "Invalid Age!" : age = parseInt(age), true))) : "Numeric value required!"]'
                    :label="`${label} age`" />
                <slot>
                </slot>
            </div>
        </v-list-item>
    </v-list>
</template>

<script setup>
const props = defineProps({
    person: Object,
    parent_index: Number,
    label: String,
    index: Number,
});
const emits = defineEmits(['show-details'])

</script>

<style lang="scss" scoped></style>