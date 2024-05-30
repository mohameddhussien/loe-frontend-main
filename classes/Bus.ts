class Bus {
    busNumber: string;
    busPlate: string;
    busModel: string;
    pickup: string;
    driver: {
        id: string;
        name: string;
    };
    year: number;
    otherFeatures: {
        hasAC: boolean;
    };
    capacity: number;

    constructor() {
        this.busNumber = '';
        this.busPlate = '';
        this.busModel = '';
        this.pickup = '';
        this.driver = { id: '', name: '' };
        this.year = 0;
        this.otherFeatures = { hasAC: false };
        this.capacity = 0;
    }
}

export {
    Bus
}
