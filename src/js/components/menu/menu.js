// import menuTemplate from './menu.pug';
import AjaxModule from '../../modules/ajax';

const root = document.getElementById('root');


function createBlock(id) {
  const block = document.createElement('div');
  block.id = id;
  block.classList.add('block');
  return block;
}


const menuLoginButtons = {
  play: 'Play',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
};

const menuUnauthButtons = {
  play: 'Play',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
};


const createMenuCallback = (response) => {
  root.innerHTML = '';
  const menu = createBlock('menu');
  let menuButtons = menuUnauthButtons;
  if (response.status === 200) {
    menuButtons = menuLoginButtons;
  }

  Object.entries(menuButtons).forEach((entry) => {
    const href = entry[0];
    const title = entry[1];

    const button = document.createElement('a');
    button.classList.add('button');
    button.setAttribute('datahref', href);
    button.innerHTML = title;

    menu.appendChild(button);
  });

  root.appendChild(menu);
};

export default function createMenu() {
  AjaxModule.Head({
    callback: createMenuCallback,
    path: '/me',
  });
}
