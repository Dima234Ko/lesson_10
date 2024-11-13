import fs from 'fs/promises'; // Импортируем модуль fs с поддержкой промисов

// Определяем интерфейс для события календаря
export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    date: string; // Можно использовать Date, если вы будете парсить его позже
    status: string;
    tags: string[];
}

// Функция для чтения данных из calendarEvents.json
export async function loadCalendarEvents(): Promise<CalendarEvent[]> {
    try {
        const data = await fs.readFile('calendarEvents.json', 'utf-8'); // Чтение файла
        const events: CalendarEvent[] = JSON.parse(data); // Парсинг JSON с указанием типа
        return events; // Возвращаем загруженные события
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
        throw new Error('Не удалось загрузить события'); // Бросаем ошибку для обработки в вызывающем коде
    }
}

// Функция, куда вы хотите отправить данные (можно оставить, если она вам нужна)
export function processEvents(events: CalendarEvent[]) {
    // Здесь вы можете обрабатывать события
    console.log('Обработанные события:', events);
}
