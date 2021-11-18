import { convertToLocalString } from "./date-time-format";

test("convert date local string with value Date", () => {
  const date: string = "2021-11-15T14:45:30Z";
  const dateLocalString = convertToLocalString(date);
  expect(dateLocalString).toEqual("15/11/2021 10:45:30 PM");
});
