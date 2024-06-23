import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { themes } from '@/utils/themes'
import { createVuetify } from 'vuetify'
import { defaults } from '@/utils/defaults'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            themes: themes
        },
        defaults,
        display: { thresholds: { xs: 500 }, mobileBreakpoint: 500 }
    })
    app.vueApp.use(vuetify)
})