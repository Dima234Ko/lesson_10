jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getFirestore: jest.fn(() => ({})),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));

import FirebaseCalendarManager from "./FirebaseCalendarManager";
import { collection, getDocs, query, where } from "firebase/firestore";
import { EventFilter } from "./ICalendarManager";

describe("FirebaseCalendarManager", () => {
  let manager: FirebaseCalendarManager;
  const mockCollection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    manager = new FirebaseCalendarManager();
    (collection as jest.Mock).mockReturnValue(mockCollection);
  });

  it("проверка фильтрации", async () => {
    const filter: EventFilter = {
      date: new Date("2023-01-01T00:00:00Z"),
      status: "completed",
      text: "Gym",
      tags: ["health"],
    };

    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          id: "1",
          data: () => ({
            title: "Gym session",
            date: filter.date,
            status: filter.status,
            tags: ["health"],
          }),
        });
      }),
    };

    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);
    const mockQuery = jest.fn(); // Создаем мок для query
    (query as jest.Mock).mockReturnValue(mockQuery);
    (where as jest.Mock).mockReturnValue(mockQuery);

    const events = await manager.filterEvents(filter);

    // Проверяем, что метод getDocs был вызван с правильным запросом
    expect(getDocs).toHaveBeenCalledWith(mockQuery);
    expect(events).toEqual([
      {
        id: "1",
        title: "Gym session",
        date: filter.date,
        status: filter.status,
        tags: ["health"],
      },
    ]);
  });

  it("проверка получения событий", async () => {
    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          id: "1",
          data: () => ({
            title: "Gym session",
            date: new Date(),
            status: "completed",
            tags: ["health"],
          }),
        });
        callback({
          id: "2",
          data: () => ({
            title: "Meeting",
            date: new Date(),
            status: "pending",
            tags: ["work"],
          }),
        });
      }),
    };

    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const events = await manager.getAllEvents();

    // Проверяем, что метод getDocs был вызван с mockCollection
    expect(getDocs).toHaveBeenCalledWith(mockCollection);
    expect(events).toEqual([
      {
        id: "1",
        title: "Gym session",
        date: expect.any(Date),
        status: "completed",
        tags: ["health"],
      },
      {
        id: "2",
        title: "Meeting",
        date: expect.any(Date),
        status: "pending",
        tags: ["work"],
      },
    ]);
  });
});
