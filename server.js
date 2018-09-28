
const morgan = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const uuid = require('uuid/v4');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');

const app = express();
app.use(morgan('dev'));  // logging
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());


const ids = {};

const users = {
  '1@mail.ru': {
    name: '1',
    email: '1@mail.ru',
    password: '111111',
  },
  '2@mail.ru': {
    name: '2',
    email: '2@mail.ru',
    password: '222222',
  },
  '3@mail.ru': {
    name: '3',
    email: '3@mail.ru',
    password: '333333',
  },
};


app.post('/signup', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (users[email]) {
    // user already exists
    return res.status(400).json({ answer: 'fail' });
  }

  const id = uuid();
  const user = { name, email, password };
  ids[id] = email;
  users[email] = user;

  res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  return res.status(200).json({ id });
});


app.post('/login', (req, res) => {
  console.log(req.body);  // Why is this shit empty???
  // W H Y ?

  const { email } = req.body;
  const { password } = req.body;

  if (!users[email] || users[email].password !== password) {
    // wrong email or/and password
    return res.status(400).json({ answer: 'fail' });
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
  return res.status(200).json({ id });
});


app.get('/me', (req, res) => {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  return res.status(200).json(users[email]);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
