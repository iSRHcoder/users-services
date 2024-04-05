import fs from 'fs';

const logger = (loggerFilePath) => {
  return (req, res, next) => {
    const { method, url } = req;
    const loggerMsg = `${new Date()} ${method} \n`;
    fs.appendFile(loggerFilePath, loggerMsg, (err) => {
      if (err) {
        console.log('Error in loggerMiddleware :', err);
      }
      next();
    });
  };
};

export default logger;
