//Структура в которой хранятся данные
export interface FinancialTransaction {
  date: string;
  summa: number;
  cat: string;
  subcat: string;
  type: string;
  comment: string;
}

export const accounting: FinancialTransaction[] = [];

//Функция структурирования и хранения данных
export function financialTransaction(
  summa: number,
  cat: string,
  subcat: string,
  type: string,
  comment: string,
): void {
  const date = new Date().toLocaleDateString("ru-RU");
  const transaction: FinancialTransaction = {
    date, // Преобразуем строку в объект Date
    summa,
    cat,
    subcat,
    type,
    comment,
  };
  accounting.push(transaction);
}

//функция, для построение статистики по категориям из диапозона дат
export function getStatistics(
  transactions: FinancialTransaction[],
  startDate: string,
  endDate: string,
) {
  const statistics: { [key: string]: { income: number; expense: number } } = {};

  // Преобразуем строки дат в объекты Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    // Проверяем, попадает ли транзакция в заданный диапазон дат
    if (transactionDate >= start && transactionDate <= end) {
      const category = transaction.cat; // Используем основную категорию
      const amount = Number(transaction.summa); // Преобразуем сумму в число

      // Проверяем, является ли amount числом
      if (isNaN(amount)) {
        console.error(`Invalid amount for transaction: ${transaction}`);
        return;
      }
      // Инициализируем категорию, если она еще не существует
      if (!statistics[category]) {
        statistics[category] = { income: 0, expense: 0 };
      }
      // Увеличиваем доход или расход в зависимости от типа транзакции
      if (transaction.type === "income") {
        statistics[category].income += amount;
      } else if (transaction.type === "expense") {
        statistics[category].expense += amount;
      }
    }
  });
  return statistics;
}

//функция, для построение статистики из диапозона дат
export function getStatisticsByDate(
  transactions: FinancialTransaction[],
  startDate: string,
  endDate: string,
) {
  const statistics: { [key: string]: { income: number; expense: number } } = {};

  // Преобразуем строки дат в объекты Date
  const start = new Date(startDate);
  const end = new Date(endDate);

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    // Проверяем, попадает ли транзакция в заданный диапазон дат
    if (transactionDate >= start && transactionDate <= end) {
      const dateKey = transactionDate.toISOString().split("T")[0]; // Формат YYYY-MM-DD
      const amount = Number(transaction.summa); // Преобразуем сумму в число

      // Проверяем, является ли amount числом
      if (isNaN(amount)) {
        console.error(`Invalid amount for transaction: ${transaction}`);
        return;
      }
      // Инициализируем дату, если она еще не существует
      if (!statistics[dateKey]) {
        statistics[dateKey] = { income: 0, expense: 0 };
      }

      // Увеличиваем доход или расход в зависимости от типа транзакции
      if (transaction.type === "income") {
        statistics[dateKey].income += amount;
      } else if (transaction.type === "expense") {
        statistics[dateKey].expense += amount;
      }
    }
  });

  return statistics;
}

//Функция построения статистики суммы по элементам из поиска
export function getStatisticsBySearch(
  transactions: FinancialTransaction[],
  searchTerm: string,
) {
  const statistics: { income: number; expense: number } = {
    income: 0,
    expense: 0,
  };

  // Приводим поисковый термин к нижнему регистру для нечувствительного к регистру поиска
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  transactions.forEach((transaction) => {
    // Проверяем, содержит ли какая-либо из полей транзакции поисковый термин
    const matchesSearch =
      transaction.cat.toLowerCase().includes(lowerCaseSearchTerm) ||
      transaction.subcat.toLowerCase().includes(lowerCaseSearchTerm) ||
      transaction.comment.toLowerCase().includes(lowerCaseSearchTerm);

    // Если транзакция соответствует критериям поиска, добавляем к статистике
    if (matchesSearch) {
      const amount = transaction.summa;
      if (transaction.type === "income") {
        statistics.income += amount;
      } else if (transaction.type === "expense") {
        statistics.expense += amount;
      }
    }
  });

  return statistics;
}

//Функция сортировки категорий по сумме за указанный диапозон дат
export function getCategoryStatisticsByDate(
  transactions: FinancialTransaction[],
  startDate: string,
  endDate: string,
) {
  const categorySums: { [key: string]: number } = {};
  // Преобразуем строки дат в объекты Date
  const start = new Date(startDate);
  const end = new Date(endDate);
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    // Проверяем, попадает ли транзакция в заданный диапазон дат
    if (transactionDate >= start && transactionDate <= end) {
      const category = transaction.cat;
      const amount = transaction.summa;
      // Инициализируем категорию, если она еще не существует
      if (!categorySums[category]) {
        categorySums[category] = 0;
      }
      // Увеличиваем сумму для категории в зависимости от типа транзакции
      if (transaction.type === "income") {
        categorySums[category] += amount;
      } else if (transaction.type === "expense") {
        categorySums[category] -= amount; // Вычитаем расходы
      }
    }
  });
  // Преобразуем объект в массив и сортируем по сумме
  const sortedCategories = Object.entries(categorySums)
    .map(([category, sum]) => ({ category, sum }))
    .sort((a, b) => b.sum - a.sum); // Сортировка по убыванию суммы
  return sortedCategories;
}
