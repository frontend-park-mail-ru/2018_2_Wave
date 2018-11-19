import Router from './modules/router';
import GameView from './snakeGame/view/gameView';

const root = document.getElementsByClassName('root')[0];

const router = new Router(root);

router
  .register('/', GameView)
  .start();


/*
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


bus.listen('snakeGame', (args) => {


  this.startX = Math.floor(this.DOMRect.x / this.cellWidth);
  this.startY = Math.floor(this.DOMRect.y / this.cellHeight);

    DOMRect: args.snakeDOMRect,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  const snakeGame = new SnakeGame({
    root:root,
    cellWidth: Math.floor(args.DOMRect.width) / (args.snakeText.length - 'snake'.length),
    cellHeight: Math.floor(args.DOMRect.height),
    cellHeightCount: 

    
    players: [{
      username: 'dlipko',
      snake: {
        text: 'dlipko',
        segments: [],
      }
      
    },
    {
      username: 'bozaro',
      snake: {
        text: 'bozaro',
        segments: [{ x: 30, y: 40, letter: 'e' },
                  { x: 30, y: 41, letter: 'b' },
                  { x: 30, y: 42, letter: 'a' }],
      }
    }],

    foods: [],

  });
});
*/