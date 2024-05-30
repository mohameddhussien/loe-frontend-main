import { useEvents } from "@/composables/store/events";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/event") {
    const { getEventByID } = useEvents();
    const res = await getEventByID(to.query.key as string);
    if (res.error.value) return navigateTo("/");
  }
});
