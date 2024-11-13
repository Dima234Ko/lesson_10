// CalendarEvent.ts
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'pending' | 'completed';
  tags: string[];
}

export interface CalendarManager {
  createEvent(event: CalendarEvent): Promise<CalendarEvent>;
  readEvent(id: string): Promise<CalendarEvent | null>;
  updateEvent(id: string, updatedEvent: Partial<CalendarEvent>): Promise<CalendarEvent | null>;
  deleteEvent(id: string): Promise<boolean>;
  filterEvents(filters: {
      text?: string;
      date?: Date;
      status?: 'pending' | 'completed';
      tags?: string[];
  }): Promise<CalendarEvent[]>;
}
