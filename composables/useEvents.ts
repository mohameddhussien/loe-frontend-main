import { type LOEEvents, LOEEvent } from "~/classes/Event";

type CallingCode = { code: string, country: string }
type CountriesCodes = CallingCode[]

const events = ref<LOEEvents>([]);

const useEvents = () => {
    const baseURL = useRuntimeConfig().public.baseURL as string
    const getAllEvents = async () => {
        const { data, error } = await useFetch<LOEEvents>('events', {
            baseURL
        });

        if (error.value) {
            console.error(`Failed to fetch all events: ${error.value.message}`);
            return [];
        }

        return (data.value || []).map(event => new LOEEvent(event))
    }
    const getCountryCodes = async () => {
        const { data, error } = await useFetch<CountriesCodes>('country-calling-codes', {
            baseURL
        });

        if (error.value) {
            console.error(`Failed to fetch country codes: ${error.value.message}`);
            return [];
        }

        return data.value || [];
    }
    const getEventByID = async (key: string) => {
        const { data, error } = await useFetch<LOEEvent>('event', {
            method: 'post',
            baseURL,
            body: { event_key: key }
        });


        if (error.value) {
            console.error(`Failed to fetch event by ID ${key}: ${error.value.message}`);
            return { error: error.value };
        }

        if (!data.value) {
            throw new Error(`No data returned for event by ID ${key}`);
        }

        return {
            data: data.value,
            error: null
        };
    }
    const initializeStates = async () => {
        events.value = await getAllEvents();
    };

    const goToDetails = (e_key: string) => {
        navigateTo({
            path: '/event',
            query: {
                key: e_key
            }
        })
    }
    const remainingDays = (event: LOEEvent) => {
        const eventDate = new Date(event.start_date ?? '');
        const currentDate = new Date();

        const difference = eventDate.getTime() - currentDate.getTime();
        const remainingDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(remainingDays)
        return remainingDays > 0 ? remainingDays + 'DAYS LEFT!' : '';
    }

    const filterToEventStatus = (status: string) => {
        navigateTo({
            path: '/events',
            query: {
                status: status
            }
        })
    }

    const formatDate = (dateString: string, options: any = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) => {
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return {
        getAllEvents,
        initializeStates,
        getCountryCodes,
        getEventByID,
        goToDetails,
        remainingDays,
        filterToEventStatus,
        formatDate,
    }
}
export { events, useEvents };
export type { CountriesCodes }
