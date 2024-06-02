import type { LOEEvents, LOEEvent } from "~/classes/Event";

type CallingCode = { code: string, country: string }
type CountriesCodes = CallingCode[]

const events = ref<LOEEvents>([]);

const useEvents = () => {
    const baseURL = useRuntimeConfig().public.baseURL as string
    const getAllEvents = async () => {
        const { data, error } = await useFetch<LOEEvents>('getallevents', {
            baseURL
        });

        if (error.value) {
            console.error(`Failed to fetch all events: ${error.value.message}`);
            return [];
        }

        return data.value || [];
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
        const { data, error } = await useFetch<LOEEvent>(`events/${key}`, {
            baseURL
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
    return {
        getAllEvents,
        initializeStates,
        getCountryCodes,
        getEventByID
    }
}
export { events, useEvents };
export type { CountriesCodes }
