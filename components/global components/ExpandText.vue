<template>
    <div class="block-content">
        <p>
            <slot name="summary">
                {{ content?.split(/\s+/).slice(0, 25).join(' ') }}
            </slot>
            <span v-show="!isExpanded">{{ alternativeText }}</span>
        <div v-show="isExpanded">
            <slot>
                <span>{{ content?.split(/\s+/).slice(25).join(' ') }}</span>
            </slot>
        </div>
        </p>
        <button class="block-content__button" @click="isExpanded = !isExpanded">
            {{ toggleCtaLabel }}
        </button>
    </div>
</template>
  
<script setup>
const props = defineProps({
    content: String,
    showText: String,
    hideText: String,
    alternativeText: {
        type: String,
        default: '...'
    }
})
const isExpanded = ref(true);
const toggleCtaLabel = computed(() =>
    isExpanded.value ? (props.hideText ? props.hideText : "Collapse") : (props.showText ? props.showText : "Expand")
)
</script>

<style scoped>
.block-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
}

.block-content__button {
    text-decoration: underline;
}
</style>