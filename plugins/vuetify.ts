import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { themes } from '@/utils/themes'
import { createVuetify, type DefaultsInstance } from 'vuetify'

const defaults: DefaultsInstance = {
    VTextField: {
        variant: 'outlined',
        color: 'primary',
        rounded: 'lg',
        // density: 'comfortable'
    },
    VCombobox: {
        variant: 'outlined',
        color: 'primary',
        rounded: 'lg',
        // density: 'comfortable'
    },
    VTextarea: {
        variant: 'outlined',
        color: 'primary',
        rounded: 'lg',
        // density: 'comfortable'
    },
    VBtn: {
        variant: 'outlined',
        rounded: 'lg',
    },
    VCard: {
        rounded: 'lg',
    },
    VListItem: {
        // rounded: 'lg',
    },
    VListItemTitle: {
        class: 'text-body-1'
    },
}
export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            themes: themes
        },
        defaults,
        display: { thresholds: { xs: 465 }, mobileBreakpoint: 465 }
    })
    app.vueApp.use(vuetify)
})