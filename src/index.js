import SnakeGame from './snakeGame/index';
import Terminal from './terminal/index';

import terminalTemplate from './terminal/index.pug';
import snakeTemplate from './snakeGame/index.pug';

import css from './style.css';

import bus from './modules/bus';

const root = document.getElementsByClassName('root')[0];

const terminal = () => {
  root.innerHTML = terminalTemplate();
  const myTerm = new Terminal({
    el: document.getElementById('term'),
    cwd: 'awesome.game@mail.ru',
    initialMessage: 'Documentation: type \'help\'\n\n',
    // initialLine: "Initial command",
    tags: ['red', 'blue', 'white', 'bold'],
    maxBufferLength: 8192,
    maxCommandHistory: 500,
    autoFocus: true,
    cmd: (argv) => {
      return false;
    },
  });
};

// main.js just fires up the application
window.addEventListener('load', terminal);

bus.listen('Escape', terminal);


bus.listen('snakeGame', (args) => {
  console.log('snake game start', args);
  root.innerHTML = snakeTemplate();
  const snakeGame = new SnakeGame(root, args);
});
