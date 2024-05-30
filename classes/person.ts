type ExpandChild = { expand: boolean }
type ExpandAdult = { adult: boolean; children: ExpandChild[] }
type ExpandPerson = ExpandAdult[]
class Child {
    name: string;
    age: string;
    food: boolean;
    pool: boolean;

    constructor() {
        this.name = "";
        this.age = "";
        this.food = false;
        this.pool = false;
    }
}
class Adult {
    name: string;
    age: string;
    contact_mandatory: string;
    contact_optional: string;
    email: string;
    children: Child[];
    bus: boolean;
    food: boolean;
    pool: boolean;

    constructor() {
        this.name = "";
        this.age = "";
        this.contact_mandatory = "";
        this.contact_optional = "";
        this.email = "";
        this.children = [];
        this.bus = false;
        this.food = false;
        this.pool = false;
    }
}
export {
    Adult,
    Child
}
export type { ExpandPerson, ExpandAdult, ExpandChild }