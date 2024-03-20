import app from './src/app.js';

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log('server has been started on :', PORT);
});
