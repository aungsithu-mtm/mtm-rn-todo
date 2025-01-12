import moment, { Moment } from 'moment';

function formatDate(date: Moment | Date) {
    const today = moment();
    const givenDate = moment(date);

    if (givenDate.isSame(today, 'day')) {
        return 'Today';
    } else if (givenDate.isSame(today.clone().add(1, 'day'), 'day')) {
        return 'Tomorrow';
    } else if (givenDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
        return 'Yesterday';
    } else {
        return givenDate.format('YYYY-MM-DD');
    }
}

function changeDate(date: Date, days: number, status: 'add' | 'substract') {
    const result = new Date(date);
    if (status === 'add') {
        result.setDate(result.getDate() + days);
    } else {
        result.setDate(result.getDate() - days);
    }
    return result;
}

function getDayOfWeek(date: Date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
}

export {
    formatDate,
    changeDate,
    getDayOfWeek
}
