interface FinancialTransaction {
    date: string,
    summa: number;
    cat: string;
    subcat: string;
    comment: string;
}

const accounting: FinancialTransaction[] = [];

//Функция структурирования и хранения данных
function financialTransaction(
    summa: number,
    cat: string,
    subcat: string,
    comment: string,
): void {
    let date = new Date().toLocaleDateString('ru-RU');
    const transaction: FinancialTransaction = {
        date, // Преобразуем строку в объект Date
        summa,
        cat,
        subcat,
        comment
    };
    accounting.push(transaction);
}




//Нет по категориям

//расход по датам из диапозона
function getDateStatistics(start: string, end: string): Record<string, number> {
    // Преобразуем строки в объекты Date
    const startDate = new Date(start);
    const endDate = new Date(end);

    const filteredExpenses = accounting.filter(expense => {
        const expenseDate = new Date(expense.date); // Преобразуем строку в объект Date
        return expenseDate >= startDate && expenseDate <= endDate;
    });

    const statistics: Record<string, number> = {};
    filteredExpenses.forEach(expense => {
        const dateString = new Date(expense.date).toISOString().split('T')[0]; // Приводим к формату YYYY-MM-DD
        if (!statistics[dateString]) {
            statistics[dateString] = 0;
        }
        statistics[dateString] += expense.summa;
    });

    return statistics;
}

//сумма по элементам
function getTotalBySearch(query: string): number {
    return accounting
        .filter(accounting =>
            accounting.cat.includes(query) ||
            accounting.subcat.includes(query) ||
            accounting.comment.includes(query)
        )
        .reduce((acc, accounting) => acc + accounting.summa, 0);
}