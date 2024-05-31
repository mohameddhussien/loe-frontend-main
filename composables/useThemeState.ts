import { useTheme } from "vuetify";

const useThemeState = () => {
    const { global } = useTheme()

    function toggleTheme() {
        global.name.value = global.current.value.dark ? 'light' : 'dark'
        document.body.classList.toggle('dark-theme');
    }
    return {
        toggleTheme
    }
}

export { useThemeState }