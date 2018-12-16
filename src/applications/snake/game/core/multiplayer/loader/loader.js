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
    this.timerId = setTimeout((_) => {

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
    clearInterval(this.timerId);
    cancelAnimationFrame(this.gameloopRequestId);
  }

  clearCanvas() {
    this.context.clearRect(0, 0,
      this.canvas.width, this.canvas.height);
  }
}
