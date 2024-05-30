<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AlertSnackBar />
</template>

<script setup>
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  filter: grayscale(1) blur(1rem);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}


</style>
