'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

app.use(body.json());
app.use(cookie());


const users = {
  'a.ostapenko@corp.mail.ru': {
    username: "ostapenko",
    email: 'a.ostapenko@corp.mail.ru',
    password: 'password',
    score: 72,
  },
  'd.dorofeev@corp.mail.ru': {
    username: "dorofeev",
    email: 'd.dorofeev@corp.mail.ru',
    password: 'password',
    score: 100500,
  },
  's.volodin@corp.mail.ru': {
    username: "volodin",
    email: 's.volodin@corp.mail.ru',
    password: '1234',
    score: 72,
  },
  'a.tyuldyukov@corp.mail.ru': {
    username: 'tyuldyukov',
    email: 'a.tyuldyukov@corp.mail.ru',
    password: '1234',
    score: 72,
  },
  'dlipko@mail.ru': {
    username: 'dlipko',
    email: 'dlipko@mail.ru',
    password: '1234',
    score: 72,
  },
};
const ids = {};

app.post('/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;
  if (
    !password || !email || !age ||
    !password.match(/^\S{4,}$/) ||
    !email.match(/@/) ||
    !(typeof age === 'number' && age > 10 && age < 100)
    ) {
    return res.status(400).json({error: 'Не валидные данные пользователя'});
}
if (users[email]) {
  return res.status(400).json({error: 'Пользователь уже существует'});
}

const id = uuid();
const user = {password, email, age, score: 0};
ids[id] = email;
users[email] = user;

res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
res.status(201).json({id});
});

app.post('/login', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;

  console.log(password, email);

  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.get('/me', function (req, res) {
  const id = req.cookies['sessionid'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  users[email].score += 1;

  res.json(users[email]);
});

app.get('/users', function (req, res) {
  const scorelist = Object.values(users)
  .sort((l, r) => r.score - l.score)
  .map(user => {
    return {
      email: user.email,
      age: user.age,
      score: user.score,
    }
  });

  res.json(scorelist);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
