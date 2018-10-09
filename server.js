const express = require('express');
const favicon = require('serve-favicon');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// const initMocks = require('./mocks');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
app.use(cookie());


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
