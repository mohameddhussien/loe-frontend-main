export default defineNuxtRouteMiddleware(async (from, to) => {
    // // Check if the user is not authenticated
    // if (!isAuthenticated()) {
    //     if (from.path === '/event' && to.path === '/login') {

    //     }
    //     // Redirect to login page with the current route as query parameter
    //     navigateTo('/login');
    // }
});

// Function to check if the user is authenticated
// const isAuthenticated = async () => {
//     const { session } = await useSession()
//     const authenticated: boolean = session.value?.token !== undefined
//     return authenticated;
// }