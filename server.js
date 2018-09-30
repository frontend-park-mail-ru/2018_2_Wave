const express = require('express');
const favicon = require('serve-favicon');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// for parsing multipart/form-data
const upload = multer({ dest: 'uploads/' });
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
app.use(cookie());


const users = {
  ostapenko: {
    username: 'ostapenko',
    password: '1234',
    score: 72,
  },
  dorofeev: {
    username: 'dorofeev',
    password: '1234',
    score: 100500,
  },
  volodin: {
    username: 'volodin',
    password: '1234',
    score: 72,
  },
  tyuldyukov: {
    username: 'tyuldyukov',
    password: '1234',
    score: 72,
  },
  dlipko: {
    username: 'dlipko',
    password: '1234',
    score: 72,
  },
  stanford: {
    username: 'stanford',
    password: '1234',
    score: 72,
  },
};

const ids = {};

// upload.none() allowes to parse FormData
app.post('/login', upload.none(), (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!users[username]
  || users[username].password !== password) {
    // wrong username or/and password
    return res.status(400).json({ answer: 'fail' });
  }

  const id = uuid();
  ids[id] = username;

  res.cookie(
    'sessionid', id,
    { expires: new Date(Date.now() + 1000 * 60 * 10) },
  );
  return res.status(202).json({ id });
});


app.post('/register', upload.single('avatar'), (req, res) => {
  const { password } = req.body;
  const { username } = req.body;
  const { filename } = req.file;

  if (!password
  || !username
  || !password.match(/^\S{4,}$/)
  ) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  if (users[username]) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const id = uuid();
  const user = {
    password,
    username,
    score: 0,
    avatarSource: `uploads/'${filename}`,
  };

  ids[id] = username;
  users[username] = user;

  res.cookie(
    'sessionid', id,
    { expires: new Date(Date.now() + 1000 * 60 * 10) },
  );
  return res.status(201).json({ id });
});


app.get('/me', (req, res) => {
  const id = req.cookies.sessionid;
  const username = ids[id];
  if (!username || !users[username]) {
    return res.status(401).end();
  }

  users[username].score += 1;

  return res.json(users[username]);
});


app.get('/users', (req, res) => {
  const scorelist = Object.values(users)
    .sort((l, r) => r.score - l.score)
    .map(user => ({
      username: user.username,
      score: user.score,
    }));

  return res.json(scorelist);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
