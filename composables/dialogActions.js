import { ref } from 'vue';

const isDialogOpen = ref(false);
const currentEvent = ref({});

const openDialog = (data) => {
    currentEvent.value = data;
    isDialogOpen.value = true;
};

const closeDialogAndSave = () => {
    isDialogOpen.value = false;

};

const cancelCurrentProcess = () => {
    isDialogOpen.value = false;

};

export { isDialogOpen, currentEvent, openDialog, cancelCurrentProcess, closeDialogAndSave };