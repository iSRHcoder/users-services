import 'dotenv/config';
import app from './src/app.js';
import mongoose from 'mongoose';

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log('Connection to DB failed', error);
  });

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log('server has been started on :', PORT);
});
