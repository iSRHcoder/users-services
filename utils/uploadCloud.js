import { v2 as cloudinary } from 'cloudinary';
import ApiError from './ApiError.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    return cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        console.error('Error uploading file to cloudinary', error);
        return reject(error);
      }
      return resolve(result.secure_url);
    });
  });
};

export const deleteFromCloud = async (file) => {
  try {
    const result = await cloudinary.uploader.destroy(file);
    console.log('Deleted from Cloudinary:', result);
    if (result.result === 'not found') {
      throw new Error('File not found in Cloudinary');
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new ApiError('Error deleting file from cloud', 400);
  }
};
