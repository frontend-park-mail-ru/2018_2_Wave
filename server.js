const express = require('express');
const favicon = require('serve-favicon');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// for parsing multipart/form-data
const upload = multer({ dest: 'public/uploads/' });
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
    password: '123456',
    score: 72,
    avatarSource: 'https://avatars3.githubusercontent.com/u/6782017?s=460&v=4',
  },
  dlipko: {
    username: 'dlipko',
    password: '123456',
    score: 72,
    avatarSource: 'https://avatars2.githubusercontent.com/u/22277868?s=460&v=4',
  },
  stanford: {
    username: 'stanford',
    password: '123456',
    score: 72,
    avatarSource: 'https://avatars1.githubusercontent.com/u/28190898?s=460&v=4',
  },
};

const ids = {};

// upload.none() allowes to parse FormData
app.post('/login', upload.none(), (req, res) => {
  const {
    username,
    password,
  } = req.body;

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
  const {
    password,
    username,
    filename,
  } = req.body;

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

  return res.status(200).json(users[username]);
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


app.put('/user', upload.single('avatar'), (req, res) => {
  const id = req.cookies.sessionid;
  const oldusername = ids[id];
  console.log(req.body);
  const {
    username,
    password,
    filename,
  } = req.body;

  console.log('old', oldusername);
  console.log('new', username, password);

  users[oldusername].username = username;
  if (password && password.match(/^\S{6,}$/)) {
    users[oldusername].password = password;
  }

  if (filename) {
    users[oldusername].avatarSource = `uploads/'${filename}`;
  }

  return res.status(200).json(users[oldusername]);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
