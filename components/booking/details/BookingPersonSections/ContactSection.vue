<template>
    <booking-details-section-grid title="Contact Information">
        <template #content>
            <v-row>
                <v-col cols="12">
                    <field v-model="adult.email" :rules="[email(true)]" label="Email" type="email" hint="Optional" />
                </v-col>
                <v-col cols="12" sm="6">
                    <field v-model="adult.contact_mandatory" :rules="[required, phone(false)]" label="Contact 1"
                        type="phone_number" />
                </v-col>
                <v-col cols="12" sm="6">
                    <field v-model="adult.contact_optional" :rules="[phone(true)]" label="Contact 2" hint="Optional"
                        type="phone_number" />
                </v-col>
            </v-row>
        </template>
    </booking-details-section-grid>
</template>

<script lang="ts" setup>
import type { Adult } from '~/classes/person';

const props = defineProps({
    adult: {
        type: Object as PropType<Adult>,
        required: true
    }
})
const { required, email, phone } = useRules()
</script>

<style lang="scss" scoped></style>