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

            dayCellDidMount: function(arg) {
                // Создаем кнопку
                const button = document.createElement('button');

                button.innerText = 'Кнопка';
              

                const dateStr = arg.date.toLocaleString('ru-RU', {
                    timeZone: 'Europe/Moscow', // Укажите нужный часовой пояс
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                button.id = dateStr; // Устанавливаем id кнопки
                // Добавляем кнопку в ячейку
                arg.el.appendChild(button);
            },
        });

        calendar.render();
    }
});
