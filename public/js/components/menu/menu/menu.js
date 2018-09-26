import createLogin from '../login/login';
import createProfile from '../profile/profile';
import createLeaderboard from '../leaderboard/leaderboard';
import createSettings from '../settings/settings';

// import menuTemplate from './menu.pug';


function createBlock(id) {
  const block = document.createElement('div');
  block.id = id;
  block.classList.add('block');
  return block;
}

function createButton(label) {
  const button = document.createElement('a');
  button.classList.add('button');
  button.innerHTML = label;
  return button;
}


// оставил без использования шаблона,
// возможно, стоит переделать
export default function createMenu() {
  const menuButtons = new Map()
    .set('Войти', createLogin)
    .set('Играть offline', createMenu)
    .set('Профиль', createProfile)
    .set('Таблица лидеров', createLeaderboard)
    .set('Настройки', createSettings);

  const menu = createBlock('menu');
  menuButtons.forEach((value, key) => {
    const button = createButton(key);
    button.addEventListener('click', (event) => {
      event.preventDefault();
      value();
    });
    menu.appendChild(button);
  });


  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(menu);

  console.log('menu block created');
}
