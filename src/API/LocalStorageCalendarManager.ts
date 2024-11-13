import fs from 'fs';
import { CalendarEvent, CalendarManager } from './CalendarEvent';

export class LocalStorageCalendarManager implements CalendarManager {
    private filePath: string;

    constructor() {
        this.filePath = 'calendarEvents.json';
    }

    private getEvents(): Promise<CalendarEvent[]> {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(this.filePath)) {
                return resolve([]);
            }
            fs.readFile(this.filePath, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    }

    private saveEvents(events: CalendarEvent[]): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, JSON.stringify(events, null, 2), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
        const events = await this.getEvents();
        events.push(event);
        await this.saveEvents(events);
        return event;
    }

    async readEvent(id: string): Promise<CalendarEvent | null> {
        const events = await this.getEvents();
        return events.find(event => event.id === id) || null;
    }

    async updateEvent(id: string, updatedEvent: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
        const events = await this.getEvents();
        const eventIndex = events.findIndex(event => event.id === id);
        if (eventIndex === -1) return null;

        const updated = { ...events[eventIndex], ...updatedEvent };
        events[eventIndex] = updated;
        await this.saveEvents(events);
        return updated;
    }

    async deleteEvent(id: string): Promise<boolean> {
        const events = await this.getEvents();
        const newEvents = events.filter(event => event.id !== id);
        await this.saveEvents(newEvents);
        return events.length !== newEvents.length;
    }

    async filterEvents(filters: {
        text?: string;
        date?: Date;
        status?: 'pending' | 'completed';
        tags?: string[];
    }): Promise<CalendarEvent[]> {
        const events = await this.getEvents();
        return events.filter(event => {
            const matchesText = filters.text ? event.title.includes(filters.text) || event.description.includes(filters.text) : true;
            const matchesDate = filters.date ? event.date.toDateString() === new Date(filters.date).toDateString() : true;
            const matchesStatus = filters.status ? event.status === filters.status : true;
            const matchesTags = filters.tags ? filters.tags.every(tag => event.tags.includes(tag)) : true;

            return matchesText && matchesDate && matchesStatus && matchesTags;
        });
    }
}
