<template>
    <div class="event-not-found">
        <h1>Event Not Found</h1>
        <p>We're sorry, but the event you're looking for doesn't exist.</p>
        <div class="buttons">
            <button @click="goHome">Return to Home</button>
            <button @click="goBack">Return to Last Visited Page</button>
        </div>
    </div>
</template>
  

<script lang="ts" setup>
definePageMeta({
    middleware: 'event-not-found'
})
const goHome = () => {
    navigateTo('/');
};

const goBack = () => {
    history.go(-1)
};
</script>


<style lang="scss" scoped>
.event-not-found {
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
    text-align: center;

    .buttons {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:first-child {
            background-color: var(--primary-color-1);
            color: #fff;

            &:hover {
                background-color: var(--primary-color-3);
            }
        }

        &:last-child {
            background-color: #6c757d;
            color: #fff;

            &:hover {
                background-color: var(--border-color);
            }
        }
    }
}
</style>
