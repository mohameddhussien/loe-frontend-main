import { useEvents } from "@/composables/useEvents";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/event") {
    const targetItemKey = to.query['key']
    const hasItemKey = events.value.some(event => event.e_key === targetItemKey);

    if (!hasItemKey) {
      sessionStorage.setItem('eventNotFound', 'true');
      return navigateTo('/event-not-found');
    }
    sessionStorage.removeItem('eventNotFound');
  }

  if (to.path === '/event-not-found') {
    const eventNotFound = sessionStorage.getItem('eventNotFound');
    if (!eventNotFound)
      return navigateTo('/')

    sessionStorage.removeItem('eventNotFound')
  }
});
