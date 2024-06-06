import { useEvents } from "@/composables/useEvents";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/event") {
    // const { getEventByID } = useEvents();
    // console.log(to.query['key'])
    // const { error } = await getEventByID(to.query.key as string);
    // if (error) return navigateTo("/");
  }
});
