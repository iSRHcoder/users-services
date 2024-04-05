import mongoose, { Schema } from 'mongoose';
import { emailRegex, mobileRegex, nameRegex } from '../../constants.js';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'First Name is required Field'],
      minlength: 3,
      match: nameRegex,
    },
    last_name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'Last Name is required Field'],
      minlength: 3,
      match: nameRegex,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required Field'],
      trim: true,
      unique: [true, 'Email should be unique, this email is already exist'],
      match: emailRegex,
    },
    mobile: {
      type: String,
      trim: true,
      match: mobileRegex,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
