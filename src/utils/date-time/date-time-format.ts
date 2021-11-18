export const convertToLocalString: any = (dateTime?: any) => {
  if (dateTime === undefined) {
    return "";
  }
  try {
    const dateTimeValue = new Date(dateTime);
    if (!(dateTimeValue instanceof Date) || dateTimeValue.toString() === "Invalid Date") {
      return "";
    }
    const localeDate = dateTimeValue.getDate() + "/" + Number(dateTimeValue.getMonth() + 1) + "/" + dateTimeValue.getFullYear();
    const localeTime = dateTimeValue.toLocaleTimeString();
    return localeDate + " " + localeTime;
  } catch (error) {
    console.log("Error while convertToLocalString");
    console.log("Input value: " + dateTime);
    console.log(error);
    return "";
  }
}