export const convertToLocalString: any = (dateTime?: any) => {
  if (dateTime === undefined) {
    return "";
  }
  const dateTimeValue = new Date(dateTime);
  if (!(dateTimeValue instanceof Date) || dateTimeValue.toString() === "Invalid Date") {
    return "";
  }
  const localeDate = dateTimeValue.getDate() + "/" + dateTimeValue.getMonth() + "/" + dateTimeValue.getFullYear();
  const localeTime = dateTimeValue.toLocaleTimeString();
  return localeDate + " " + localeTime;
}