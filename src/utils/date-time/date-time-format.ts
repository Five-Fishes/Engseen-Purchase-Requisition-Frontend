export const convertToLocalString: (dateTime?: any, dateOnly?: boolean) => string = (dateTime?: any, dateOnly: boolean = false) => {
  try {
    const dateTimeValue = new Date(dateTime)

    if (dateTimeValue.toString() === 'Invalid Date') throw new Error('Invalid Date')

    const localeDate = dateTimeValue.getDate() + '/' + Number(dateTimeValue.getMonth() + 1) + '/' + dateTimeValue.getFullYear()
    if (dateOnly) {
      return localeDate
    }
    const localeTime = dateTimeValue.toLocaleTimeString()
    return localeDate + ' ' + localeTime
  } catch (error) {
    const e = error as Error

    console.group('convertToLocalString')
    console.error('Error message', e.message)
    console.error('Input value: ' + dateTime)
    console.error('Stack Trace', e.stack)
    console.groupEnd()
    return ''
  }
}
