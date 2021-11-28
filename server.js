const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8010;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Author', 'Lozhkin S.A.');
  next();
});

const task = (x) => {
  return new Promise((resolve, reject) => {
    if (x < 13) resolve('yes');
    else reject('no');
  });
};

app.get('/login', (req, res) => {
  res.send('Lozhkin');
});

app.get('/login/ru', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login/by', function (req, res) {
  fs.readFile('login.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err);
        return;
      }
  
      data = data.toString();
      res.setHeader("Content-Type","text/plain; charset=UTF-8")
      res.writeHead(200);
      res.end(data);
  });
});

app.get('/fetch/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
  res.sendFile(path.resolve(__dirname, 'index.html'));
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

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'error.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
