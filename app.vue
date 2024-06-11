<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AlertSnackBar />
</template>

<script lang="ts" setup>
// import { defineEventHandler, useSession } from "h3";
// import { app } from './h3-app'

// app.use('/session',
//   defineEventHandler(async (event) => {
//     const session = await useSession(event, {
//       password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
//     });
//     console.log(session)
//     return session
//   }),
// );
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
