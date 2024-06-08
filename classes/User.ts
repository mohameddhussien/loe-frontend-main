class User {
    person_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    gender?: 'Male' | 'Female';
    phone?: string;

    constructor(
        person_id: number,
        first_name: string,
        last_name: string,
        email: string,
        username: string,
        password: string,
        gender: 'Male' | 'Female',
        phone: string
    ) {
        this.person_id = person_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.phone = phone;
    }

    toString(): string {
        return `User(person_id=${this.person_id}, first_name=${this.first_name}, last_name=${this.last_name}, email=${this.email}, username=${this.username}, gender=${this.gender}, phone=${this.phone})`;
    }
}
export { User }
