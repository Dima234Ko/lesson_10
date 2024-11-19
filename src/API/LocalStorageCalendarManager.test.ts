import { LocalStorageCalendarManager } from "./LocalStorageCalendarManager";
import { CalendarEvent, EventFilter } from "./ICalendarManager";

describe("LocalStorageCalendarManager", () => {
  let manager: LocalStorageCalendarManager;

  beforeEach(() => {
    localStorage.clear();
    manager = new LocalStorageCalendarManager();
  });

  test("Проверка создания", async () => {
    const event: CalendarEvent = {
      id: "1",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["test"],
    };

    await manager.createEvent(event);
    const events = await manager.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      ...event,
      date: event.date.toISOString(),
    });
  });

  test("Проверка чтения", async () => {
    const event: CalendarEvent = {
      id: "1",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["test"],
    };

    await manager.createEvent(event);
    const fetchedEvent = await manager.readEvent("1");
    expect(fetchedEvent).toEqual({
      ...event,
      date: event.date.toISOString(),
    });
  });

  test("Проверка обновления", async () => {
    const event: CalendarEvent = {
      id: "1",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["test"],
    };

    await manager.createEvent(event);

    const updatedEvent: CalendarEvent = {
      id: "1",
      title: "Обновленное событие",
      description: "Это обновленное событие",
      date: new Date("2023-01-02T00:00:00Z"),
      status: "completed",
      tags: ["updated"],
    };

    await manager.updateEvent(updatedEvent);
    const fetchedEvent = await manager.readEvent("1");
    expect(fetchedEvent).toEqual({
      ...updatedEvent,
      date: updatedEvent.date.toISOString(),
    });
  });

  test("Проверка удаления", async () => {
    const event: CalendarEvent = {
      id: "1",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["test"],
    };

    await manager.createEvent(event);
    await manager.deleteEvent("1");
    const fetchedEvent = await manager.readEvent("1");
    expect(fetchedEvent).toBeNull();
  });

  test("Проверка фильтрации", async () => {
    const event1: CalendarEvent = {
      id: "1",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["work", "team"],
    };

    const event2: CalendarEvent = {
      id: "2",
      title: "Тестовое событие",
      description: "Это тестовое событие",
      date: new Date("2023-01-02T00:00:00Z"),
      status: "pending",
      tags: ["personal", "shopping"],
    };

    const event3: CalendarEvent = {
      id: "3",
      title: "Искомое событие",
      description: "Это искомое событие",
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      tags: ["personal", "health"],
    };

    await manager.createEvent(event1);
    await manager.createEvent(event2);
    await manager.createEvent(event3);

    const filter: EventFilter = {
      text: "Искомое", // Поиск по тексту
      date: new Date("2023-01-01T00:00:00Z"), // Фильтрация по дате
      status: "completed", // Фильтрация по статусу
      tags: ["personal"], // Фильтрация по тегам
    };

    const filteredEvents = await manager.filterEvents(filter);

    expect(filteredEvents).toHaveLength(1);
    expect(filteredEvents[0]).toEqual({
      ...event3,
      date: event3.date.toISOString(),
    });
  });
});
