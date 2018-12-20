import SnakeModel from './snakeModel';
import SnakeController from './snakeController';
import SnakeView from './snakeView';

export default class Loader {
  constructor(canvas, loaderParams) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.loaderParams = loaderParams;

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.framesPerSecond = 10;

    this.controllers = [];
    this.views = [];

    this.startTmer = this.startTmer.bind(this);

    this.snakes = 1;
    for (let i = 0; i < this.snakes; i += 1) {
      const snake = new SnakeModel();
      this.controllers.push(new SnakeController(snake, loaderParams));
      this.views.push(new SnakeView(snake, this.context, loaderParams));
    }
  }

  start() {
    this.controllers.forEach((controller) => {
      controller.init();
    });
    this.gameloop();
    this.bigin =  (new Date()).getTime();

    this.timer = document.createElement('div');
    this.timer.classList.add('multiplayer-timer');
    const [root] = document.getElementsByClassName('snakegame-container');
    root.appendChild(this.timer);
    this.startTmer();
  }

  hideTimer() {
    this.timer.hidden = true;
  }

  showTimer() {
    this.timer.hidden = false;
  }

  startTmer() {
    let s = (new Date()).getTime() - this.bigin;
    s = parseInt(s / 1000, 10);

    const m = parseInt(s / 60, 10);
    s -= m * 60;

    this.timer.innerHTML = `${m}:${s}`;
    console.log(`${m}:${s}`);
    this.timerId = setTimeout(this.startTmer, 1000);
  }

  gameloop() {
    this.loaderId = setTimeout((_) => {
      this.clearCanvas();
      this.controllers.forEach((controller) => {
        controller.update();
      });

      this.views.forEach((view) => {
        view.render();
      });

      this.gameloopRequestId = requestAnimationFrame(this.gameloop.bind(this));
    }, 1000 / this.framesPerSecond);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timer.remove();
    clearInterval(this.loaderId);
    cancelAnimationFrame(this.gameloopRequestId);
  }

  clearCanvas() {
    this.context.clearRect(0, 0,
      this.canvas.width, this.canvas.height);
  }
}
