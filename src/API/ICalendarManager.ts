// ICalendarManager.ts
export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    date: Date;
    status: 'pending' | 'completed';
    tags: string[];
}

export interface ICalendarManager {
    createEvent(event: CalendarEvent): Promise<void>;
    readEvent(id: string): Promise<CalendarEvent | null>;
    updateEvent(event: CalendarEvent): Promise<void>;
    deleteEvent(id: string): Promise<void>;
    getEvents(): Promise<CalendarEvent[]>;
    filterEvents(filter: EventFilter): Promise<CalendarEvent[]>;
}

export interface EventFilter {
    text?: string;
    date?: Date;
    status?: 'pending' | 'completed';
    tags?: string[];
}
