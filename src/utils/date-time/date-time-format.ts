export const convertToLocalString: (dateTime?: any, dateOnly?: boolean) => string = (dateTime?: any, dateOnly: boolean = false) => {
  try {
    const dateTimeValue = new Date(dateTime);

    if (dateTimeValue.toString() === 'Invalid Date') throw new Error('Invalid Date');

    const localeDate = convertToLocalDate(dateTimeValue);
    if (dateOnly) {
      return localeDate;
    }
    const localeTime = convertToLocalTime(dateTimeValue);
    return localeDate + ' ' + localeTime;
  } catch (error) {
    const e = error as Error;

    console.group('convertToLocalString');
    console.error('Error message', e.message);
    console.error('Input value: ' + dateTime);
    console.error('Stack Trace', e.stack);
    console.groupEnd();
    return '';
  }
};

export const convertToLocalDate: (date: Date) => string = (date: Date) => {
  date = new Date(date);
  return date.getDate() + '/' + Number(date.getMonth() + 1) + '/' + date.getFullYear();
};

export const convertToLocalTime: (date: Date) => string = (date: Date) => {
  date = new Date(date);
  return date.toLocaleTimeString('en-US');
};
