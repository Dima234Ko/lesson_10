// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { LocalStorageCalendarManager } from './API/LocalStorageCalendarManager.js'; 
import { CalendarEvent} from './API/CalendarEvent.js';



const app = express();
const port = 3000;
const calendarManager = new LocalStorageCalendarManager();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { title, description, date, status, tags } = req.body;
    const event: CalendarEvent = {
        id: Date.now().toString(),
        title,
        description,
        date: new Date(date),
        status: status || 'pending',
        tags: tags || [],
    };
    const createdEvent = await calendarManager.createEvent(event);
    res.status(201).json(createdEvent);
});

app.get('/events/:id', async (req, res) => {
    const event = await calendarManager.readEvent(req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.put('/events/:id', async (req, res) => {
    const updatedEvent = await calendarManager.updateEvent(req.params.id, req.body);
    if (updatedEvent) {
        res.json(updatedEvent);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.delete('/events/:id', async (req, res) => {
    const deleted = await calendarManager.deleteEvent(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.get('/events', async (req, res) => {
    const filters = req.query;
    const filteredEvents = await calendarManager.filterEvents(filters);
    res.json(filteredEvents);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});