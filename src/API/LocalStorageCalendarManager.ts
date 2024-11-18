import { ICalendarManager, CalendarEvent, EventFilter } from './ICalendarManager';

export class LocalStorageCalendarManager implements ICalendarManager {
    private storageKey: string;

    constructor() {
        this.storageKey = 'calendarEvents';
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    private getEventsFromStorage(): CalendarEvent[] {
        const rawData = localStorage.getItem(this.storageKey);
        return rawData ? JSON.parse(rawData) : [];
    }

    private saveEventsToStorage(events: CalendarEvent[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(events));
    }

    async createEvent(event: CalendarEvent): Promise<void> {
        const events = this.getEventsFromStorage();
        events.push(event);
        this.saveEventsToStorage(events);
    }

    async readEvent(id: string): Promise<CalendarEvent | null> {
        const events = this.getEventsFromStorage();
        return events.find(event => event.id === id) || null;
    }

    async updateEvent(event: CalendarEvent): Promise<void> {
        const events = this.getEventsFromStorage();
        const index = events.findIndex(e => e.id === event.id);
        if (index !== -1) {
            events[index] = event;
            this.saveEventsToStorage(events);
        }
    }

    async deleteEvent(id: string): Promise<void> {
        const events = this.getEventsFromStorage();
        const filteredEvents = events.filter(event => event.id !== id);
        this.saveEventsToStorage(filteredEvents);
    }

    async getEvents(): Promise<CalendarEvent[]> {
        return this.getEventsFromStorage();
    }

    async filterEvents(filter: EventFilter): Promise<CalendarEvent[]> {
        const events = await this.getEvents(); 
        return events.filter(event => {
            const matchesText = filter.text ? 
                event.title.includes(filter.text) || event.description.includes(filter.text) : true;
            
            const eventDate = new Date(event.date); 
            const matchesDate = filter.date ? 
                eventDate.toDateString() === filter.date.toDateString() : true;

            const matchesStatus = filter.status ? event.status === filter.status : true;
            const matchesTags = filter.tags ? filter.tags.every(tag => event.tags.includes(tag)) : true;

            return matchesText && matchesDate && matchesStatus && matchesTags;
        });
    }
}
