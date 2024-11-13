// // FirebaseCalendarManager.ts
// import { CalendarEvent, CalendarManager } from './CalendarEvent';
// import { db } from '../../firebaseConfig'; // Импортируйте вашу конфигурацию
// import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

// export class FirebaseCalendarManager implements CalendarManager {
//   async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
//     const docRef = await addDoc(collection(db, 'calendarEvents'), event);
//     return { ...event, id: docRef.id };
//   }

//   async readEvent(id: string): Promise<CalendarEvent | null> {
//     const docRef = doc(db, 'calendarEvents', id);
//     const docSnap = await getDoc(docRef);
//     return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as CalendarEvent : null;
//   }

//   async updateEvent(id: string, updatedEvent: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
//     const docRef = doc(db, 'calendarEvents', id);
//     await updateDoc(docRef, updatedEvent);
//     return this.readEvent(id);
//   }

//   async deleteEvent(id: string): Promise<boolean> {
//     const docRef = doc(db, 'calendarEvents', id);
//     await deleteDoc(docRef);
//     return true;
//   }

//   async filterEvents(filters: {
//     text?: string;
//     date?: Date;
//     status?: 'pending' | 'completed';
//     tags?: string[];
//   }): Promise<CalendarEvent[]> {
//     const eventsRef = collection(db, 'calendarEvents');
//     let q = query(eventsRef);

//     if (filters.text) {
//       // Добавляем фильтрацию по тексту
//       q = query(eventsRef, where('title', '==', filters.text)); // Пример фильтрации по заголовку
//     }

//     const querySnapshot = await getDocs(q);
//     const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CalendarEvent));

//     // Дополнительная фильтрация на стороне клиента
//     return events.filter(event => {
//       const matchesText = filters.text ? event.title.includes(filters.text) || event.description.includes(filters.text) : true;
//       const matchesDate = filters.date ? event.date.toDateString() === filters.date.toDateString() : true;
//       const matchesStatus = filters.status ? event.status === filters.status : true;
//       const matchesTags = filters.tags ? filters.tags.every(tag => event.tags.includes(tag)) : true;

//       return matchesText && matchesDate && matchesStatus && matchesTags;
//     });
//   }
// }
