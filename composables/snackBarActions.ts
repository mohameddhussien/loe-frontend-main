interface SnackbarOptions {
    increment?: number;
    progress: number;
    timeout?: number;
}

interface SnackbarState {
    snackbar: boolean;
    snackbarText: string;
    color?: string;
}

// Refs for SnackbarState and SnackbarOptions
const snackbarState = ref<SnackbarState>({
    snackbar: false,
    snackbarText: "This is a message from the snackbar",
    color: 'success'
});

const snackBarOptions = ref<SnackbarOptions>({
    increment: 2,
    progress: 0,
    timeout: 3000,
});

const showSnackbar = (state: SnackbarState, options: SnackbarOptions): void => {
    snackbarState.value = state || snackbarState.value;
    snackBarOptions.value = options || snackBarOptions.value;
    if (!snackbarState.value.snackbar) {
        snackbarState.value.snackbar = true;
        const interval: NodeJS.Timeout = setInterval(() => hideSnackBar(interval), 60);
    }
};
const hideSnackBar = (interval: NodeJS.Timeout): void => {
    snackBarOptions.value.progress += snackBarOptions.value?.increment ?? 1;
    if (snackBarOptions.value.progress >= 100 || !snackbarState.value.snackbar) {
        snackBarOptions.value.progress = 0;
        snackbarState.value.snackbar = false;
        clearInterval(interval);
        return
    }
}
export { showSnackbar, snackbarState, snackBarOptions };