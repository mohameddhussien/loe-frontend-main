import type { DefaultsInstance } from 'vuetify'

const variant = { variant: 'outlined' }
const rounded = { rounded: 'lg' }
const color = { color: 'primary' }
const fields = {
    ...variant,
    ...color,
    ...rounded,
}
const defaults: DefaultsInstance = {
    VTextField: { ...fields },
    VCombobox: { ...fields },
    VTextarea: { ...fields },
    VBtn: { ...variant, ...rounded },
    VCard: { ...rounded },
    VListItemTitle: { class: 'text-body-1' },
    VCardTitle: { class: 'text-h5 text-light-title' },
    VCardSubtitle: { class: 'text-body-1 text-dark-subtitle' },
}
export { defaults }