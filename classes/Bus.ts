
interface Reservation {
    application_status?: string;
    event_bus_id?: number;
    first_name?: string;
    last_name?: string;
    reservation_date?: string;
    reservation_id?: number;
    seat_number: number;
    user_id?: number;
    seater: string;
}
interface EventBus {
    capacity: string;
    driver_name: string;
    dropoff_location: string;
    event_bus_id: number;
    pickup_location: string;
    plate_number: string;
    reservations: Reservation[];
}

type EventBuses = EventBus[]

export type { EventBuses, EventBus, Reservation }