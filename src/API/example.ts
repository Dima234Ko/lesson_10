// example.ts
import { LocalStorageCalendarManager } from "./LocalStorageCalendarManager";
import { CalendarEvent } from "./ICalendarManager";

const calendarManager = new LocalStorageCalendarManager();

// Создание события
const event: CalendarEvent = {
  id: "1",
  title: "Meeting with team",
  description: "Discuss project updates",
  date: new Date("2023-10-15"),
  status: "pending",
  tags: ["work", "meeting"],
};

async function run() {
  await calendarManager.createEvent(event);

  // Чтение события
  const fetchedEvent = await calendarManager.readEvent("1");
  console.log("Fetched Event:", fetchedEvent);

  // Обновление события
  event.status = "completed";
  await calendarManager.updateEvent(event);

  // Фильтрация событий
  const filteredEvents = await calendarManager.filterEvents({
    text: "meeting",
  });
  console.log("Filtered Events:", filteredEvents);

  // Удаление события
  await calendarManager.deleteEvent("1");
}

run().catch(console.error);
