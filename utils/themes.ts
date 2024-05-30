import type { ThemeDefinition } from 'vuetify'
import colors from 'vuetify/util/colors'

const myLightColors: Record<string, string> = {
    background: '#EAEEF2',
    surface: '#FFFFFF',
    primary: '#ff97aa',
    secondary: '#f097fc',
    'primary-2': '#ffbfca',
    'secondary-2': '#f8c0f5',
    'primary-3': '#ffe6eb',
    'light-title': '#2D2D2D',
    'dark-title': '#101A22',
    'light-subtitle': '#B8B8B8',
    'dark-subtitle': '#737373',
    'light-text': '#F9F9F9',
    'dark-background': '#60656F',
    'light-background': '#eff3f8',
    'lighter-background': 'rgba(255,221,250,0.1)',
    hover: '#46A6F4',
    'disabled-element': '#8EC2F2',
    muted: '#BDBDBD',
    success: '#2DC071',
    danger: '#E74040',
    alert: '#F48242',
    error: colors.red.base
}
const myDarkColors: Record<string, string> = {
    background: '#101A22', // Using the dark title color as a base background
    surface: '#60656F', // Using the dark background color as a surface
    primary: '#ff6e84', // Adjusted primary color
    secondary: '#e577fa', // Adjusted secondary color
    'primary-2': '#ff8093', // Keeping primary-2 color the same
    'secondary-2': '#dfa6e3', // Keeping secondary-2 color the same
    'primary-3': '#ffb3c0', // Adjusted primary-3 color
    'light-title': '#F9F9F9', // Swapping light and dark titles
    'dark-title': '#EAEEF2', // Swapping light and dark titles
    'light-subtitle': '#737373', // Swapping light and dark subtitles
    'dark-subtitle': '#B8B8B8', // Swapping light and dark subtitles
    'light-text': '#2D2D2D', // Using a dark color for light text
    'dark-background': '#eff3f8', // Using light background for dark background
    'light-background': '#2D2D2D', // Using dark title for light background
    'lighter-background': '#2D2D2D', // Adjusting lighter background to be more subtle
    hover: '#46A6F4', // Keeping hover color the same
    'disabled-element': '#8EC2F2', // Keeping disabled element color the same
    muted: '#BDBDBD', // Keeping muted color the same
    success: '#2DC071', // Keeping success color the same
    danger: '#E74040', // Keeping danger color the same
    alert: '#F48242', // Keeping alert color the same
    error: colors.red.base // Keeping error color the same
}
const light: ThemeDefinition = {
    colors: myLightColors,
    dark: false,
}
const dark: ThemeDefinition = {
    colors: myDarkColors,
    dark: true,
}
const themes = {
    light: light,
    dark: dark
}

export { themes }