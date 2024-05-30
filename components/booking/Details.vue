<template>
    <base-dialog scrollable width="10000" :show-footer="false" v-model="opened" @close="emits('cancel')"
        transition="dialog-bottom-transition" fullscreen color="primary-2">
        <template #title>
            <v-toolbar class="border-b" color="rgba(255,255,255,0.4)">
                <template #prepend>
                    <v-card flat color="transparent">
                        <v-card-text>
                            <v-btn variant="plain" icon="mdi-close" @click="emits('cancel')" v-bind="props" />
                            <!-- <button @click="emits('cancel')" class="special-button plain ga-2" v-bind="props"
                                style="width: 50px;">
                                <v-icon icon="mdi-close" />
                            </button> -->
                        </v-card-text>
                    </v-card>
                </template>
                <template #default>
                    <v-divider vertical inset />
                    <v-toolbar-title>
                        <v-row no-gutters align="center">
                            <v-img src="/loelogo.png" max-width="175" aspect-ratio="2" cover />
                        </v-row>
                    </v-toolbar-title>
                </template>
            </v-toolbar>
        </template>
        <booking-steppers style="margin-bottom: 6.5rem;" />
        <booking-footer :event="event" />
    </base-dialog>
</template>
<script lang="ts" setup>
const emits = defineEmits(['cancel', 'save'])
const props = defineProps({
    dialogOpen: Boolean,
    event: Object
})
const opened = ref(props.dialogOpen);

watchEffect(() => {
    opened.value = props.dialogOpen;
});

</script>

<style scoped></style>