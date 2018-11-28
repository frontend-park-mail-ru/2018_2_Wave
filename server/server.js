const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const ws = require('express-ws');

const app = express();
ws(app);

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

app.all('*/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sw.js'));
});

app.all('*/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app.bundle.js'));
});

// app.use(express.static(path.join(__dirname, '/public')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
