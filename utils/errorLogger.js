import fs from 'fs';

const errorLogger = (errorLoggerFilePath, req, error) => {
  const { method, url } = req;
  const errorLoggerMsg = `${new Date()} ${method} ${url}: ${error} \n`;
  fs.appendFile(errorLoggerFilePath, errorLoggerMsg, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

export default errorLogger;
