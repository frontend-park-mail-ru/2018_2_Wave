'use strict';


const root = document.getElementById('root');


function createBlock(id) {
  const block = document.createElement('div');
  block.id = id
  block.classList.add('block');
  return block;
}

function createButton(label) {
  const button = document.createElement('a');
  button.classList.add('button');
  button.innerHTML = label;
  return button
}


function createMenu() {
  const menuButtons = new Map()
  .set('Войти', createLogin)
  .set('Играть offline', createMenu)
  .set('Профиль', createProfile)
  .set('Таблица лидеров', createLeaderboard)
  .set('Настройки', createSettings)

  const menu = createBlock('menu');
  menuButtons.forEach( (value, key) => {
    let button = createButton(key)
    button.addEventListener('click', function (event) {
      event.preventDefault();
      show(value());
    });
    menu.appendChild(button);
  });

  console.log("menu block created");
  return menu
}

function createMenuButton () {
  const menuButton = createButton('Back to menu');
  menuButton.addEventListener('click', function (event) {
    event.preventDefault();
    show(createMenu());
  });
  return menuButton
}


function createLogin() {
  const loginBlock = createBlock('login');

  const form = document.createElement('div');
  loginBlock.classList.add('form');
  const fields = [
    {
      name: 'login',
      type: 'login',
      placeholder: 'Login'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    },
  ];

  fields.forEach(item => {
    const field = document.createElement('input');

    field.name = item.name;
    field.type = item.type;
    field.placeholder = item.placeholder;

    form.appendChild(field);
  });

  const submitButton = createButton('login');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    // сюда магию логина
    show(createMenu());
  });
  form.appendChild(submitButton);

  const message = document.createElement('p');
  message.classList.add('message');
  message.innerHTML = "Not registered? ";
  const loginLink = document.createElement('a');
  loginLink.innerHTML = "Create an account";
  loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    show(createRegister());
  });
  message.appendChild(loginLink);
  form.appendChild(message);

  loginBlock.appendChild(form);

  console.log("login block created");
  return loginBlock
}


function createRegister() {
  const registerBlock = createBlock('login');

  const form = document.createElement('divs');
  registerBlock.classList.add('form');
  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email'
    },
    {
      name: 'age',
      type: 'number',
      placeholder: 'Your age'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    },
    {
      name: 'password_repeat',
      type: 'password',
      placeholder: 'Repeat Password'
    }
  ];

  fields.forEach(function (item) {
    const field = document.createElement('input');

    field.name = item.name;
    field.type = item.type;
    field.placeholder = item.placeholder;

    form.appendChild(field);
  });

  const submitButton = createButton('register');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    // сюда магию регистрации
    show(createMenu());
  });
  form.appendChild(submitButton);

  const message = document.createElement('p');
  message.classList.add('message');
  message.innerHTML = "Already registered? ";
  const regLink = document.createElement('a');
  regLink.innerHTML = "Login";
  regLink.addEventListener('click', function (event) {
    event.preventDefault();
    show(createLogin());
  });
  message.appendChild(regLink);
  form.appendChild(message);

  registerBlock.appendChild(form);
  root.appendChild(registerBlock);

  console.log("register block created");
  return registerBlock
}


function createProfile() {
  // потом заменим на реальные данные из базы
  const profileData = {
    name: 'Dieter Rams',
    avatarSrc: '/img/dieter_rams.jpg',
    description: 'слегка сжатый по бокам, потом пофиксим',
  }

  const profileBlock = createBlock('profile');

  const avatar = document.createElement('img');
  avatar.src = profileData.avatarSrc;
  profileBlock.appendChild(avatar);

  const nameField = document.createElement('h3');
  nameField.innerHTML = profileData.name;
  profileBlock.appendChild(nameField);

  const description = document.createElement('p');
  description.innerHTML = profileData.description;
  profileBlock.appendChild(description);

  profileBlock.appendChild(createMenuButton());

  console.log("profile block created");
  return profileBlock
}


function createSettings() {
  const settingsBlock = createBlock('settings');

  const testSlider = document.createElement('input');
  testSlider.id = 'vol-control';
  testSlider.type = 'range';
  testSlider.min = 0;
  testSlider.max = 100;
  testSlider.step = 1;

  settingsBlock.appendChild(testSlider);

  const description = document.createElement('p');
  description.innerHTML = 'enjoy our slider';
  settingsBlock.appendChild(description);

  settingsBlock.appendChild(createMenuButton());

  console.log("settings block created");
  return settingsBlock
}


function createLeaderboard() {
  const leaderboard = createBlock('leaderboard');
  root.appendChild(leaderboard);
  const table = document.createElement('table');
  table.classList.add('leadertable');
  leaderboard.appendChild(table);

  const leaders = [
    {
      player: 'Alfreds Futterkiste',
      level: 10,
      score: 3505,
    },
    {
      player: 'Berglunds snabbköp',
      level: 10,
      score: 3412,
    },
    {
      player: 'Centro comercial Moctezuma',
      level: 8,
      score: 2058,
    },
    {
      player: 'Ernst Handel',
      level: 4,
      score: 1002,
    }
  ];

  leaders.forEach(leader => {
    const row = document.createElement('tr');
    table.appendChild(row);
    Object.values(leader).forEach(value => {
      const column = document.createElement('td');
      row.appendChild(column);
      column.innerHTML = value;
    });
  });

  leaderboard.appendChild(createMenuButton());

  console.log("leaderboard block created");
  return leaderboard
}


function show(element) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(element)
}


show(createMenu());
