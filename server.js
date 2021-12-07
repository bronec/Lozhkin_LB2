const express = require('express');
const path = require('path');
const app = express();
var fs = require('fs');

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

app.get('/login/', (req, res) => {
  res.send('Lozhkin');
});

app.get('/login/code2', function (req, res) {
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

app.get('/login/code1', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login/:id', function (req, res) {
  if(req.params.id == 1){
      res.writeHeader(200, 
          { 
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*', 
              'X-Author': 'Lozhkin'
          });
          res.write(JSON.stringify("Lozhkin"));
          res.end();
          return;
  }
  if(req.params.id == 2){
      res.setHeader("Content-Type", "application/json").send(JSON.stringify("Lozhkin"));
  }
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

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'error.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'errorsecond.html'));
})

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));