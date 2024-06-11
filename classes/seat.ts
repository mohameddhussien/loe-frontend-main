type SeatType = 'driver' | 'normal' | 'passenger' | 'not-seat';
type SeatPosition = [number, number];

interface SeatStrategyMethods {
    isNotSeat(position: SeatPosition): boolean;
    setInitialLabel(capacity: number): string;
}

class Seat implements SeatStrategyMethods {
    seat_id?: number;
    label: string;
    disabled: boolean;
    isSelected: boolean;
    isTaken: boolean;
    position: SeatPosition = [-1, -1];
    seatNumber: number;
    seatType: SeatType;

    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        this.seatType = seatType;
        this.disabled = this.seatType == 'not-seat';
        this.position = position;
        this.seatNumber = this.setSeatNumber(seatNumber, capacity);
        this.label = this.setInitialLabel(capacity);
        this.isSelected = false;
        this.isTaken = false;
    }


    setSeatNumber(seat_number: number, capacity: number): number {
        if (this.seatType == 'normal')
            return seat_number
        if (this.seatType == 'passenger')
            return capacity
        return -1
    }

    setInitialLabel(capacity: number): string {
        if (this.seatType == 'normal')
            return this.seatNumber.toString();
        if (this.seatType == 'passenger')
            return capacity.toString();
        return '';
    }

    isNotSeat(position: SeatPosition): boolean {
        // Default implementation in base class
        return false;
    }
}

class Seat13 extends Seat {
    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        super(position, seatNumber, seatType, capacity);
    }

    public isNotSeat(position: SeatPosition): boolean {
        return (position[0] === 0 && (position[1] >= 1 && position[1] <= 2)) ||
            (position[0] === 1) || (position[0] === 2 && (position[1] >= 2 && position[1] <= 3))
            || (position[0] >= 3 && position[0] <= 4 && position[1] === 2);
    }
}

class Seat14 extends Seat {
    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        super(position, seatNumber, seatType, capacity);
    }

    public isNotSeat(position: SeatPosition): boolean {
        return (position[0] === 0 && position[1] >= 1 && position[1] < 3) || position[0] == 1 ||
            (position[0] > 2 && position[0] < 6 && position[1] == 2) || (position[0] == 5 && position[1] < 3) ||
            (position[1] == 3 && (position[0] > 0 && position[0] < 4));
    }
}

class Seat21 extends Seat {
    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        super(position, seatNumber, seatType, capacity);
    }

    public isNotSeat(position: SeatPosition): boolean {
        return (position[0] == 0 && (position[1] >= 1 && position[1] < 3)) || position[0] == 1 ||
            ((position[0] == 2 || position[0] == 3) && position[1] > 1) || (position[1] == 2 && position[0] != 8);
    }
}

class Seat28 extends Seat {
    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        super(position, seatNumber, seatType, capacity);
    }

    public isNotSeat(position: SeatPosition): boolean {
        return (position[0] === 0 && (position[1] >= 1 && position[1] <= 3)) ||
            (position[0] === 1) || (position[0] === 2 && (position[1] >= 2))
            || (position[0] >= 3 && position[0] < 8 && position[1] === 2);
    }
}

class Seat50 extends Seat {
    constructor(position: SeatPosition, seatNumber: number, seatType: SeatType, capacity: number) {
        super(position, seatNumber, seatType, capacity);
    }

    public isNotSeat(position: SeatPosition): boolean {
        return (position[0] === 0 && (position[1] >= 1 && position[1] < 4)) || position[0] === 1 ||
            (position[1] === 2 && position[0] !== 14) ||
            ((position[0] === 6 || position[0] === 7) && (position[1] === 3 || position[1] === 4));
    }
}

export { Seat, Seat13, Seat14, Seat21, Seat28, Seat50 };

export type {
    SeatType,
    SeatPosition
};
