const root = document.getElementById('root');


function createBlock(id) {
  const block = document.createElement('div');
  block.id = id;
  block.classList.add('block');
  return block;
}


const menuButtons = {
  play: 'Play',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
};


export default function createMenu() {
  root.innerHTML = '';
  const menu = createBlock('menu');

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
}
