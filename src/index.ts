import "./API/example";
import "./workPage.ts";

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: 'dayGridMonth',
            events: [
                { title: 'Event 1', date: '2023-10-01' },
                { title: 'Event 2', date: '2023-10-07' },
            ],
            dayCellDidMount: function(arg) {
                // Создаем кнопку
                const button = document.createElement('button');
                button.innerText = 'Кнопка';
                button.onclick = () => {
                    alert(`Кнопка нажата для ${arg.dateStr}`);
                };

                // Добавляем кнопку в ячейку
                arg.el.appendChild(button); // Используем arg.el вместо arg.dayEl
            },
        });

        calendar.render();
    }
});
