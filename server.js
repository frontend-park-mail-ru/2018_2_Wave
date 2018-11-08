const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');


const app = express();


app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

app.all('*/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/app.bundle.js'));
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


http.createServer(app).listen(8080);
console.log('HTTP-server started');

try {
  const key  = fs.readFileSync('cert/server.key', 'utf8');
  const cert = fs.readFileSync('cert/server.pem', 'utf8');
  const credentials = { key, cert };
  https.createServer(credentials, app).listen(8443);
  console.log('HTTPS-server started');
} catch (err) {
  console.log('HTTPS-server failed');
}
