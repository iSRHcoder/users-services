import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    //upload file to cloudinary
    return cloudinary.uploader.upload(file, (error, result) => {
      if (error) {
        console.error('Error uploading file to cloudinary', error);
        return reject(error);
      }
      //
      return resolve(result.secure_url);
    });
  });
};

export default uploadCloud;
