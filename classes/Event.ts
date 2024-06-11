interface Image {
    e_id: number;
    image_id: number;
    image_url: string;
}

class LOEEvent {
    capacity?: number;
    category?: string;
    description?: string;
    e_id?: number;
    e_key?: string;
    e_name?: string;
    end_date?: string;
    images?: Image[];
    is_published?: number;
    location?: string;
    organizer_id?: number;
    price?: string;
    reg_end_date?: string;
    reg_start_date?: string;
    show_price?: boolean;
    start_date?: string;
    date_published?: string;

    constructor(event: LOEEvent) {
        Object.assign(this, event);
    }

    public isJustAnnounced(): boolean {
        const datePublished = new Date(this.date_published ?? '');
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return datePublished >= sevenDaysAgo;
    }

    public isComingSoon(): boolean {
        return !this.start_date || !this.is_published;
    }
}
interface LOEEvents extends Array<LOEEvent> { }

export { LOEEvent }
export type { Image, LOEEvents };
