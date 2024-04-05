import {
  avatarRegex,
  emailRegex,
  imageRegex,
  mobileRegex,
  nameRegex,
} from '../constants.js';

export const isNameValid = (name) => nameRegex.test(name);

export const isEmailValid = (email) => emailRegex.test(email);

export const isMobileValid = (mobile) => mobileRegex.test(mobile);

export const isAvatarValid = (avatar) => avatarRegex.test(avatar);

export const isFileIsImage = (fileName) => imageRegex.test(fileName);
