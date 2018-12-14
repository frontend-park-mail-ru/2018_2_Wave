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
  }

  gameloop() {
    setTimeout((_) => {

      this.setBlackBackground();
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
    cancelAnimationFrame(this.gameloopRequestId);
  }

  setBlackBackground() {
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.rect(0, 0, this.loaderParams.windowWidth, this.loaderParams.windowHeight);
    this.context.fill();
    this.context.closePath();
  }
}
