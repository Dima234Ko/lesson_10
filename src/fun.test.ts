import { accounting, financialTransaction, getStatistics, getStatisticsByDate, getStatisticsBySearch, getCategoryStatisticsByDate, FinancialTransaction } from './fun'; // Убедитесь, что путь правильный

describe('Financial Transaction Statistics', () => {
    const transactions: FinancialTransaction[] = [
        { date: '2023-01-01', type: 'income', summa: 100, cat: 'Salary', subcat: 'Main', comment: 'Monthly salary' },
        { date: '2023-01-02', type: 'expense', summa: 50, cat: 'Food', subcat: 'Groceries', comment: 'Weekly groceries' },
        { date: '2023-01-02', type: 'income', summa: 200, cat: 'Freelance', subcat: 'Project A', comment: 'Freelance work' },
        { date: '2023-01-03', type: 'expense', summa: 30, cat: 'Transport', subcat: 'Taxi', comment: 'Taxi fare' },
        { date: '2023-01-04', type: 'income', summa: 150, cat: 'Salary', subcat: 'Bonus', comment: 'Year-end bonus' },
        { date: '2023-01-05', type: 'expense', summa: 70, cat: 'Food', subcat: 'Dining', comment: 'Dinner out' },
    ];
    
    describe('getStatistics', () => {
        it('should return correct statistics for given date range', () => {
            const startDate = '2023-01-01';
            const endDate = '2023-01-03';
            const expected = {
                Salary: { income: 100, expense: 0 },
                Food: { income: 0, expense: 50 },
                Freelance: { income: 200, expense: 0 },
                Transport: { income: 0, expense: 30 },
            };
            const result = getStatistics(transactions, startDate, endDate);
            expect(result).toEqual(expected);
        });
        it('should handle empty transaction list', () => {
            const result = getStatistics([], '2023-01-01', '2023-01-10');
            expect(result).toEqual({});
        });
        it('should return empty statistics for date range with no transactions', () => {
            const startDate = '2023-01-10';
            const endDate = '2023-01-15';
            const result = getStatistics(transactions, startDate, endDate);
            expect(result).toEqual({});
        });
    });
    describe('getStatisticsByDate', () => {
        it('should return correct statistics grouped by date', () => {
            const startDate = '2023-01-01';
            const endDate = '2023-01-05';
            const expected = {
                '2023-01-01': { income: 100, expense: 0 },
                '2023-01-02': { income: 200, expense: 50 },
                '2023-01-03': { income: 0, expense: 30 },
                '2023-01-04': { income: 150, expense: 0 },
                '2023-01-05': { income: 0, expense: 70 },
            };
            const result = getStatisticsByDate(transactions, startDate, endDate);
            expect(result).toEqual(expected);
        });
        it('should handle empty transaction list', () => {
            const result = getStatisticsByDate([], '2023-01-01', '2023-01-10');
            expect(result).toEqual({});
        });
        it('should return empty statistics for date range with no transactions', () => {
            const startDate = '2023-01-10';
            const endDate = '2023-01-15';
            const result = getStatisticsByDate(transactions, startDate, endDate);
            expect(result).toEqual({});
        });
    });
});


describe('getStatisticsBySearch', () => {
    const transactions: FinancialTransaction[] = [
        { date: '2023-01-01', type: 'income', summa: 100, cat: 'Salary', subcat: 'Main', comment: 'Monthly salary' },
        { date: '2023-01-02', type: 'expense', summa: 50, cat: 'Food', subcat: 'Groceries', comment: 'Weekly groceries' },
        { date: '2023-01-02', type: 'income', summa: 200, cat: 'Freelance', subcat: 'Project A', comment: 'Freelance work' },
        { date: '2023-01-03', type: 'expense', summa: 30, cat: 'Transport', subcat: 'Taxi', comment: 'Taxi fare' },
        { date: '2023-01-04', type: 'income', summa: 150, cat: 'Salary', subcat: 'Bonus', comment: 'Year-end bonus' },
        { date: '2023-01-05', type: 'expense', summa: 70, cat: 'Food', subcat: 'Dining', comment: 'Dinner out' },
    ];
    it('should return correct statistics for matching search term in category', () => {
        const result = getStatisticsBySearch(transactions, 'Food');
        expect(result).toEqual({ income: 0, expense: 120 }); // 50 + 70
    });
    it('should return correct statistics for matching search term in subcategory', () => {
        const result = getStatisticsBySearch(transactions, 'Main');
        expect(result).toEqual({ income: 100, expense: 0 });
    });
    it('should return correct statistics for matching search term in comment', () => {
        const result = getStatisticsBySearch(transactions, 'Freelance work');
        expect(result).toEqual({ income: 200, expense: 0 });
    });
    it('should return correct statistics for case insensitive search', () => {
        const result = getStatisticsBySearch(transactions, 'salary');
        expect(result).toEqual({ income: 250, expense: 0 }); // 100 + 150
    });
    it('should return 0 income and expense for non-matching search term', () => {
        const result = getStatisticsBySearch(transactions, 'Nonexistent');
        expect(result).toEqual({ income: 0, expense: 0 });
    });
    it('should handle empty transaction list', () => {
        const result = getStatisticsBySearch([], 'Food');
        expect(result).toEqual({ income: 0, expense: 0 });
    });
});

describe('getCategoryStatisticsByDate', () => {
    const transactions: FinancialTransaction[] = [
        { date: '2023-01-01', type: 'income', summa: 100, cat: 'Salary', subcat: 'Main', comment: 'Monthly salary'  },
        { date: '2023-01-02', type: 'expense', summa: 50, cat: 'Food', subcat: 'Groceries', comment: 'Weekly groceries'},
        { date: '2023-01-02', type: 'income', summa: 200, cat: 'Freelance', subcat: 'Groceries', comment: 'Weekly groceries' },
        { date: '2023-01-03', type: 'expense', summa: 30, cat: 'Transport', subcat: 'Groceries', comment: 'Weekly groceries' },
        { date: '2023-01-04', type: 'income', summa: 150, cat: 'Salary', subcat: 'Groceries', comment: 'Weekly groceries' },
        { date: '2023-01-05', type: 'expense', summa: 70, cat: 'Food', subcat: 'Groceries', comment: 'Weekly groceries' },
    ];
    it('should return empty array for date range with no transactions', () => {
        const result = getCategoryStatisticsByDate(transactions, '2023-01-10', '2023-01-15');
        expect(result).toEqual([]);
    });
    it('should handle empty transaction list', () => {
        const result = getCategoryStatisticsByDate([], '2023-01-01', '2023-01-05');
        expect(result).toEqual([]);
    });
});

















