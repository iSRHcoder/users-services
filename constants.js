export const nameRegex = /^[a-zA-Z\s]{3,}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const mobileRegex = /^\d{10}$/;

export const avatarRegex =
  /^(?:(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(?:\/[\w-]+)*(?:\/?|\/\w+\.[a-zA-Z]{2,})?(?:\?\w+=\w+(?:&\w+=\w+)*)?)$|^(?:[\w-]+(\.[\w-]+)*\.(jpg|jpeg|png|gif|bmp))$/i;

export const imageRegex =
  /^(?:(?:http|https):\/\/[\w\-.]+\.[a-zA-Z]{2,}(?:\/\S*)?)|(?:.+\.)(jpg|jpeg|png|gif)$/i;

export const loggerPath = 'logs/log.txt';
export const loggerErrorPath = 'logs/loggerError.txt';
export const PUBLIC_FOLDER_PATH = 'public';
export const LOGS_FOLDER_PATH = 'logs';
export const UPLOADS_FOLDER_PATH = 'uploads';
