import { Seat, Seat13, Seat14, Seat21, Seat28, Seat50 } from '@/classes/seat'
import type { SeatPosition, SeatType } from '@/classes/seat'
const seats = ref<Seat[][]>([]);

type BusSize = { rows: number, cols: number };

enum BusCapacity {
    Small = 13,
    MediumSmall = 14,
    Medium = 21,
    Large = 28,
    ExtraLarge = 50,
}

const useBus = () => {

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

    const getSeat = (position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number): Seat => {
        if (capacity === 13)
            return new Seat13(position, seatNumber, seatType, capacity);
        else if (capacity === 14)
            return new Seat14(position, seatNumber, seatType, capacity);
        else if (capacity === 21)
            return new Seat21(position, seatNumber, seatType, capacity);
        else if (capacity === 28)
            return new Seat28(position, seatNumber, seatType, capacity);
        else if (capacity === 50)
            return new Seat50(position, seatNumber, seatType, capacity);
        else
            throw new Error("Invalid capacity: " + capacity);
    }

    const getSeatType = (position: SeatPosition, busSize: BusSize): SeatType => {
        let seatType: SeatType = 'normal';
        const isDriver = position[0] === 0 && position[1] === 0
        const isPassenger = position[0] == 0 && position[1] == busSize.cols - 1
        // console.log('Position: ', position)

        if (isDriver)
            seatType = 'driver';
        else if (isPassenger)
            seatType = 'passenger';
        return seatType
    }

    function incrementSeatCounter(seatType: SeatType, seatCounter: globalThis.Ref<number>) {
        if (seatType == 'normal')
            seatCounter.value++;
    }

    const createSeatsArray = (busCapacity: number): Seat[][] => {
        const seatCounter = ref(1);
        const busSize = getBusSize(busCapacity)

        return Array.from({ length: busSize.rows }, (_, i) => {
            return Array.from({ length: busSize.cols }, (_, j) => {
                const position: SeatPosition = [i, j];
                const seatType = getSeatType(position, busSize);
                // console.log('Position: ', position)
                // console.log('Type: ', seatType)
                // console.log('Seat number(before and after): ', seatCounter.value - 1, seatCounter.value)
                const mySeat = getSeat(position, seatCounter.value, seatType, busCapacity)
                mySeat.disabled = mySeat.isNotSeat(position)
                mySeat.seatType = mySeat.disabled ? 'not-seat' : mySeat.seatType
                incrementSeatCounter(mySeat.seatType, seatCounter);
                // console.log('Disabled: ', mySeat.disabled)
                // console.log('Type: ', mySeat.seatType)
                return mySeat;
            });
        });
    }

    return {
        createSeatsArray,
        seats,
    }
}
export {
    useBus,
    createSeatsArray,
    BusCapacity,
}
