// FirebaseCalendarManager.test.ts

// Мокаем методы Firestore и uuid
jest.mock('firebase/firestore', () => {
    return {
        collection: jest.fn(),
        addDoc: jest.fn(),
        getDocs: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
        getFirestore: jest.fn(() => ({})), // Добавляем мок для getFirestore
    };
});

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'unique-id'), // Мокаем функцию uuid для предсказуемости
}));

import { v4 as uuidv4 } from 'uuid';
import FirebaseCalendarManager from './FirebaseCalendarManager';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { EventFilter } from './ICalendarManager';

describe('FirebaseCalendarManager', () => {
    let manager: FirebaseCalendarManager;
    const mockCollection = jest.fn();
    const mockAddDoc = jest.fn();
    const mockGetDocs = jest.fn();
    const mockQuery = jest.fn();
    const mockWhere = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        manager = new FirebaseCalendarManager();
        (collection as jest.Mock).mockReturnValue(mockCollection);
        (addDoc as jest.Mock).mockImplementation(mockAddDoc);
        (getDocs as jest.Mock).mockImplementation(mockGetDocs);
        (query as jest.Mock).mockImplementation(mockQuery);
        (where as jest.Mock).mockImplementation(mockWhere);
    });

    it('should create an event', async () => {
        const event = {
            title: 'Gym session',
            description: 'Workout and cardio',
            date: new Date('2023-01-01T00:00:00Z'),
            status: 'completed',
            tags: ['personal', 'health'],
            id: uuidv4()
        };

        await manager.createEvent(event);

        // Проверяем, что метод addDoc был вызван с объектом, содержащим id
        expect(addDoc).toHaveBeenCalledWith(mockCollection, {
            ...event,
            id: 'unique-id',
        });
    });

    it('should filter events', async () => {
        const filter: EventFilter = {
            date: new Date('2023-01-01T00:00:00Z'),
            status: 'completed',
            text: 'Gym',
            tags: ['health'],
        };

        const mockSnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: '1', data: () => ({ title: 'Gym session', date: filter.date, status: filter.status, tags: ['health'] }) });
            }),
        };

        (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);
        (query as jest.Mock).mockReturnValue(mockQuery);
        (where as jest.Mock).mockReturnValue(mockWhere);

        const events = await manager.filterEvents(filter);

        // Проверяем, что метод getDocs был вызван с правильным запросом
        expect(getDocs).toHaveBeenCalledWith(mockQuery);
        expect(events).toEqual([{ id: '1', title: 'Gym session', date: filter.date, status: filter.status, tags: ['health'] }]);
    });

    it('should get all events', async () => {
        const mockSnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: '1', data: () => ({ title: 'Gym session', date: new Date(), status: 'completed', tags: ['health'] }) });
                callback({ id: '2', data: () => ({ title: 'Meeting', date: new Date(), status: 'pending', tags: ['work'] }) });
            }),
        };

        (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

        const events = await manager.getAllEvents();

        // Проверяем, что метод getDocs был вызван с eventsCollection
        expect(getDocs).toHaveBeenCalledWith(mockCollection);
        expect(events).toEqual([
            { id: '1', title: 'Gym session', date: expect.any(Date), status: 'completed', tags: ['health'] },
            { id: '2', title: 'Meeting', date: expect.any(Date), status: 'pending', tags: ['work'] }
        ]);
    });
});
