import multer from 'multer';
import { UPLOADS_FOLDER_PATH, loggerErrorPath } from '../constants.js';
import { isFileIsImage } from './validator.js';
import errorLogger from './errorLogger.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${UPLOADS_FOLDER_PATH}/`);
  },
  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    if (isFileIsImage(fileName)) {
      req.body.avatar = fileName;
      cb(null, fileName);
    } else {
      errorLogger(loggerErrorPath, req, 'Image Validation Error');
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
