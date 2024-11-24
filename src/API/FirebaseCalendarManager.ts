// FirebaseCalendarManager.ts
import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { CalendarEvent, EventFilter } from "./ICalendarManager";

class FirebaseCalendarManager {
  private eventsCollection = collection(db, "events");

  async createEvent(event: CalendarEvent): Promise<void> {
    const eventWithId = { ...event, id: uuidv4() };
    await addDoc(this.eventsCollection, eventWithId);
  }

  async filterEvents(filter: EventFilter): Promise<CalendarEvent[]> {
    let q = query(
      this.eventsCollection,
      where("date", "==", filter.date),
      where("status", "==", filter.status),
    );

    if (filter.text) {
      q = query(q, where("title", "array-contains", filter.text));
    }

    if (filter.tags && filter.tags.length > 0) {
      q = query(q, where("tags", "array-contains-any", filter.tags));
    }

    const querySnapshot = await getDocs(q);
    const events: CalendarEvent[] = [];

    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() } as CalendarEvent);
    });

    return events;
  }

  async getAllEvents(): Promise<CalendarEvent[]> {
    const querySnapshot = await getDocs(this.eventsCollection);
    const events: CalendarEvent[] = [];

    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() } as CalendarEvent);
    });

    return events;
  }
}

export default FirebaseCalendarManager;
