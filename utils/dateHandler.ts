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

function formatTimestamp(timestamp: number | string | undefined): string {
    const date = new Date(Number(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[date.getDay()];

    return `${day}-${month}-${year} (${dayName})`;
}

function timestampToDateString(timestamp: number | string | undefined): string {
    const date = new Date(Number(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}


export {
    formatDate,
    changeDate,
    getDayOfWeek,
    formatTimestamp,
    timestampToDateString
}
