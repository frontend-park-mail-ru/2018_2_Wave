const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

app.use(body.json());
app.use(cookie());


const users = {
  ostapenko: {
    username: 'ostapenko',
    password: 'password',
    score: 72,
  },
  dorofeev: {
    username: 'dorofeev',
    email: 'd.dorofeev@corp.mail.ru',
    password: 'password',
    score: 100500,
  },
  volodin: {
    username: 'volodin',
    email: 's.volodin@corp.mail.ru',
    password: '1234',
    score: 72,
  },
  tyuldyukov: {
    username: 'tyuldyukov',
    email: 'a.tyuldyukov@corp.mail.ru',
    password: '1234',
    score: 72,
  },
  dlipko: {
    username: 'dlipko',
    email: 'dlipko@mail.ru',
    password: '1234',
    score: 72,
  },
};
const ids = {};

app.post('/signup', (req, res) => {
  const {
    password,
    username,
  } = req.body;
  if (
    !password || !username
    || !password.match(/^\S{4,}$/)
  ) {
    return res.status(400).json({
      error: 'Не валидные данные пользователя',
    });
  }
  if (users[username]) {
    return res.status(400).json({
      error: 'Пользователь уже существует'
    });
  }

  const id = uuid();
  const user = {
    password,
    score: 0,
  };
  ids[id] = username;
  users[username] = user;

  res.cookie('sessionid', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10)
  });
  res.status(201).json({
    id,
  });
});

app.post('/login', (req, res) => {
  const {
    password,
    username,
  } = req.body;


  if (!password || !username) {
    return res.status(400).json({
      error: 'Не указан E-Mail или пароль',
    });
  }
  if (!users[username] || users[username].password !== password) {
    return res.status(400).json({
      error: 'Не верный E-Mail и/или пароль',
    });
  }

  const id = uuid();
  ids[id] = username;

  res.cookie('sessionid', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10)
  });
  res.status(201).json({
    id,
  });
});

app.get('/me', (req, res) => {
  const id = req.cookies.sessionid;
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  users[email].score += 1;

  res.json(users[email]);
});

app.get('/users', (req, res) => {
  const scorelist = Object.values(users)
    .sort((l, r) => r.score - l.score)
    .map((user) => {
      return {
        username: user.username,
        score: user.score,
      };
    });

  res.json(scorelist);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
