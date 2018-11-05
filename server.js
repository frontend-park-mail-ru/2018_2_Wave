const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

app.all('*/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/app.bundle.js'));
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
