
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/event") {
    const targetItemKey = to.query['key']
    const hasItemKey = events.value.some(event => event.e_key === targetItemKey);

    // console.log('targetItemKey: ', targetItemKey)

    if (!hasItemKey) {
      sessionStorage.setItem('eventNotFound', String(true));
      return navigateTo('/event-not-found');
    }
    sessionStorage.removeItem('eventNotFound');
  }

  if (to.path === '/event-not-found') {
    const eventNotFound = sessionStorage.getItem('eventNotFound');
    if (!eventNotFound)
      return abortNavigation()

    sessionStorage.removeItem('eventNotFound')
  }
});
