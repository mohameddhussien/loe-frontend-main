interface EventItem {
  CAPACITY: number;
  CATEGORY: string;
  DESCRIPTION: string;
  EVENT_DATE: string;
  EVENT_ID: number;
  EVENT_KEY: string;
  EVENT_NAME: string;
  IMAGES: string[];
  IS_PUBLISHED: number;
  LOCATION: string;
  ORGANIZER_ID: number;
  PRICE: number;
  REGISTRATION_END_DATE: string;
  REGISTRATION_START_DATE: string;
  STATUS: string;
}
interface CountryCode {
  country: string;
  code: string;
}
const useEvents = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL as string;
  const getAllEvents = async () => {
    const response = await useFetch<EventItem>("getallevents", {
      baseURL: baseURL,
    });
    return response;
  };
  const getCountryCodes = async () => {
    const response = await useFetch<CountryCode[]>("country-calling-codes", {
      baseURL: baseURL,
    });
    // console.log(response.data.value)
    return response;
  };
  const getEventByID = async (key: string) => {
    const response = await useFetch<EventItem>("events/" + key, {
      baseURL: baseURL,
    });
    console.log(key)
    return response;
  };
  return {
    getAllEvents,
    getCountryCodes,
    getEventByID,
  };
};

export { useEvents, type EventItem };
