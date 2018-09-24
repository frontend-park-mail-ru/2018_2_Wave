'use strict';

// const cookie = require('cookie-parser');

const morgan = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const uuid = require('uuid/v4');
const app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(favicon(__dirname + '/public/img/favicon.png'));


// app.use(body.json());
// app.use(cookie());


const ids = {};

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


app.post('/signup', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (users[email]) {
    // user already exists
    return res.status(400).json({answer: "fail"});
  }

  const id = uuid();
  const user = {name, email, password};
  ids[id] = email;
  users[email] = user;

  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});


app.post('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!users[email] || users[email].password !== password) {
    // wrong email or/and password
    return res.status(400).json({answer : "fail"});
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
