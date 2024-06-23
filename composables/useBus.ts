import { Seat, Seat13, Seat14, Seat21, Seat28, Seat50 } from '@/classes/seat';
import type { SeatPosition, SeatType, Seats, Deck } from '@/classes/seat';
import type { EventBus } from '~/classes/Bus';

const seats = ref<Seats>(new Map());
const normalSeats: Deck = reactive(new Map());

type BusSize = { rows: number, cols: number };

enum BusCapacity {
    Small = 13,
    MediumSmall = 14,
    Medium = 21,
    Large = 28,
    ExtraLarge = 50,
}

const useBus = () => {
    const baseURL = useRuntimeConfig().public.baseURL as string;
    const busSizeMap: Record<BusCapacity, BusSize> = {
        [BusCapacity.Small]: { rows: 6, cols: 4 },
        [BusCapacity.MediumSmall]: { rows: 7, cols: 4 },
        [BusCapacity.Medium]: { rows: 9, cols: 4 },
        [BusCapacity.Large]: { rows: 9, cols: 5 },
        [BusCapacity.ExtraLarge]: { rows: 15, cols: 5 },
    };

    const getBusSize = (capacity?: number): BusSize => {
        if (capacity && capacity in busSizeMap)
            return busSizeMap[capacity as BusCapacity];
        return { rows: 1, cols: 1 };
    }

    const getSeat = (position: SeatPosition, seatType: SeatType, capacity: number): Seat => {
        if (capacity === 13)
            return new Seat13(position, seatType, capacity);
        else if (capacity === 14)
            return new Seat14(position, seatType, capacity);
        else if (capacity === 21)
            return new Seat21(position, seatType, capacity);
        else if (capacity === 28)
            return new Seat28(position, seatType, capacity);
        else if (capacity === 50)
            return new Seat50(position, seatType, capacity);
        else
            throw new Error("Invalid capacity: " + capacity);
    }

    const getSeatType = (position: SeatPosition, busSize: BusSize): SeatType => {
        let seatType: SeatType = 'normal';
        const isDriver = position[0] === 0 && position[1] === 0;
        const isPassenger = position[0] == 0 && position[1] == busSize.cols - 1;

        if (isDriver)
            seatType = 'driver';
        else if (isPassenger)
            seatType = 'passenger';
        return seatType;
    }

    function incrementSeatCounter(seatType: SeatType, seatCounter: globalThis.Ref<number>) {
        if (seatType == 'normal')
            seatCounter.value++;
    }

    const createSeatsMap = (bus?: EventBus): Seats => {
        if (!bus) return new Map();

        const seatCounter = ref(1);
        const capacity = parseInt(bus.capacity);
        const busSize = getBusSize(capacity);
        const reservations = bus.reservations;

        const seatMap: Seats = new Map();

        Array.from({ length: busSize.rows }, (_, i) => {
            const rowSeats: Deck = new Map();

            Array.from({ length: busSize.cols }, (_, j) => {
                const position: SeatPosition = [i, j];
                const seatType = getSeatType(position, busSize);
                const mySeat = getSeat(position, seatType, capacity);

                mySeat.disabled = mySeat.isNotSeat(position);
                mySeat.seatType = mySeat.disabled ? 'not-seat' : mySeat.seatType;
                mySeat.setSeatNumber(seatCounter.value, capacity)
                incrementSeatCounter(mySeat.seatType, seatCounter);

                if (mySeat.seatType == 'normal' || mySeat.seatType == 'passenger')
                    normalSeats.set(mySeat.seatNumber, mySeat);

                if (mySeat.seatType === 'driver')
                    mySeat.label = bus.driver_name;

                rowSeats.set(mySeat.seatNumber, mySeat);
            });

            seatMap.set(i, rowSeats);
        });

        reservations.forEach(reservation => {
            const seat = normalSeats.get(reservation.seat_number)
            if (seat) {
                seat.isTaken = true;
                seat.label = reservation.seater ?? reservation.first_name;
                seat.reservation_id = reservation.reservation_id;
            }
        });
        console.log(seatMap)
        return seatMap;
    };

    const getBusesOfEvent = async (event_id?: number) => {
        const { data, error } = await useFetch('/buses-of-event', {
            baseURL,
            method: 'post',
            body: {
                'e_id': event_id
            }
        });

        if (error.value)
            console.error(`Failed to fetch buses of event by id ${event_id}: ${error.value.message}`);

        return { data, error };
    };

    return {
        createSeatsMap,
        getBusesOfEvent,
        getSeat,
        normalSeats,
        seats
    };
}

export {
    useBus,
    BusCapacity,
}
