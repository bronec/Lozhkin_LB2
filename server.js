const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8010;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const task = (x) => {
  return new Promise((resolve, reject) => {
    if (x < 18) resolve('yes');
    else reject('no');
  });
};

app.get('/login', (req, res) => {
  res.send('Lozhkin');
});

app.get('/promise', (req, res) => {
  res.send(task.toString());
});

app.get('/promise/:val', async (req, res) =>{
  try{
    const val = req.params.val;
    const result = await task(parseInt(val))
    res.send(result)
  }catch(err){
    res.send(err)
  }
})

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
  res.send('<h1>Lozhkin</h1>')
})

app.get('/fetch', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
