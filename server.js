const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const https = require('https');

const key  = fs.readFileSync('cert/server.key', 'utf8');
const cert = fs.readFileSync('cert/server.pem', 'utf8');
const credentials = { key, cert };

const app = express();


app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

app.all('*/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/app.bundle.js'));
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);
