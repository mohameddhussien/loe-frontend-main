const events = ref([]);
const eventNames = ref([]);
const getAllEvents = async () => {
    const { data } = await useFetch('getallevents', {
        baseURL: useRuntimeConfig().public.baseURL
    });
    return data.value;
}
const getCountryCodes = async () => {
    const { data } = await useFetch('country-calling-codes', {
        baseURL: useRuntimeConfig().public.baseURL
    });
    return data;
}
const getEventByID = async (key) => {
    const {data} = await useFetch(`events/${key}`, {
        baseURL: useRuntimeConfig().public.baseURL
    });
    return data;
}
const fetchEvents = async () => {
    try {
        events.value = await getAllEvents();
        eventNames.value = events.value.map(event => event.EVENT_NAME);
    } catch (error) {
        console.log('Error in useEvents Composable!\n')
        throw error;
    }
};
// Invoke the fetchData function as soon as the module is imported
await fetchEvents().catch(error => {
    console.error('Failed to fetch events:', error);
});

export { events, eventNames, getCountryCodes, getEventByID };
