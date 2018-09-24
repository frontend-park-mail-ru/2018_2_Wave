'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());


const users = {
  "1" : {
    name : "1",
    email : "1@mail.ru",
    password : "111111",
  },
  "2" : {
    name : "2",
    email : "2@mail.ru",
    password : "222222",
  },
  "3" : {
    name : "3",
    email : "3@mail.ru",
    password : "333333",
  },
};

const ids = {};

app.post('/signup', function (req, res) {
  const email = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (users[email]) {
    return res.status(400).json({answer: "fail"}); // user already exists
  }

  const id = uuid();
  const user = {name, email, password};
  ids[id] = email;
  users[email] = user;

  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.post('/login', function (req, res) {
  const password = req.body.email;
  const email = req.body.password;

  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({answer : "fail"}); // wrong email or/and password
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.get('/me', function (req, res) {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
