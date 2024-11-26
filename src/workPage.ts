// workPage.ts
export function createForm(container: HTMLElement, date: string) {
    const form = document.createElement('form');
    form.id = 'eventForm';
  
    // Поле для названия события
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Event Title';
    titleInput.required = true;
  
    // Поле для описания события
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Event Description';
  
    // Поле для даты события (устанавливаем выбранную дату)
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = date; // Используем переданную дату
    dateInput.required = true;
  
    // Остальная часть кода остается без изменений
    // ...
  
    // Добавляем элементы в форму
    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dateInput);
    // Добавляем кнопки
    // ...
  
    container.appendChild(form);
  }
  