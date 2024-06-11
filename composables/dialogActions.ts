import { ref } from 'vue';

const isDialogOpen = ref(false);

const useDialog = () => {

    const toggleDialog = () => {
        isDialogOpen.value = !isDialogOpen.value
    }
    
    const saveDialog = () => {
        isDialogOpen.value = false;
    };

    const cancelDialog = () => {
        isDialogOpen.value = false;
    };
    return {
        saveDialog,
        cancelDialog,
        toggleDialog
    }
}


export { isDialogOpen, useDialog };