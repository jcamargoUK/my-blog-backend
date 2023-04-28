import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});





app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
