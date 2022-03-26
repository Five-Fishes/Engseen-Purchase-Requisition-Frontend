export function generateErrorMessage(message: number): string {
  if (message >= 400 && message < 500) {
    return `Client Error, please check client request compliance with backend server specifications! ⚠️ Status Code: ${message}`;
  } else if (message >= 500) {
    return `Server Error, please check server request handling controller! ⚠️ Status Code: ${message}`;
  } else {
    return `Unknown Error, please contact IT! ⚠️ Status Code: ${message}`;
  }
}
