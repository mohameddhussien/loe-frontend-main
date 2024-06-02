type Images = string[]
type LOEEvent = {
    CAPACITY: number;
    CATEGORY: string;
    DESCRIPTION: string;
    EVENT_DATE: string;
    EVENT_ID: number;
    EVENT_KEY: string;
    EVENT_NAME: string;
    IMAGES: Images;
    IS_PUBLISHED?: number;
    LOCATION?: string;
    ORGANIZER_ID: number;
    PRICE?: number;
    REGISTRATION_END_DATE?: string;
    REGISTRATION_START_DATE?: string;
    STATUS: string;
};
type LOEEvents = LOEEvent[];

export type { Images, LOEEvent, LOEEvents }