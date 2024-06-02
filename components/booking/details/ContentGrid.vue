<template>
    <v-row v-for="(person, personIndex) in people" :key="`${type}-${personIndex}`" :id="`${type}-${personIndex}`">
        <v-col cols="12" :class="columnClasses(personIndex)">
            <slot :person="person" :index="personIndex" />
        </v-col>
        <v-col cols="12" v-if="personIndex != people.length - 1">
            <v-divider />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
type PersonType = 'adult' | 'child'

const props = defineProps({
    people: { type: Array<any>, required: true },
    type: { type: Object as PropType<PersonType>, required: true },
    contentVariant: { type: String, default: 'tonal' },
    scrollVariant: { type: String, default: 'primary' }
})

const isSelectedPerson = (personIndex: number) => {
    if (props.type === 'adult')
        return selectedPerson.value.adultIndex === personIndex;
    return selectedPerson.value.childIndex === personIndex;
};

const columnClasses = (personIndex: number) => {
    return {
        'section rounded-lg': true,
        [props.contentVariant]: true,
        'fade-in-border': isSelectedPerson(personIndex),
        [props.scrollVariant]: isSelectedPerson(personIndex)
    }
}
</script>

<style lang="scss" scoped></style>