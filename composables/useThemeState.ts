import { useTheme } from "vuetify";

const useThemeState = () => {
    const { global, current } = useTheme()
    const isDark = computed(() => current.value.dark)

    const toggleTheme = () => {
        global.name.value = global.current.value.dark ? 'light' : 'dark'
        document.body.classList.toggle('dark-theme');
    }
    
    return {
        toggleTheme,
        isDark
    }
}

export { useThemeState }