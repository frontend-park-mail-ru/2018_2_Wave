import busController from '../../modules/busController';
import Element from '../../../element';
import levelModel from '../../game/models/levelModel';

export default class BaseMenu extends Element {
  constructor(template, parent, wrapper) {
    super(template, parent, wrapper);
    this.firstFocus = undefined;
    this.busController = busController;
    this.focusClass = 'snakemenu-button_focus';

    this.eventsMethods = {
      Tab: this.toggleMenuDown.bind(this),
      Enter: this.processLine.bind(this),
      ArrowUp: this.toggleMenuUp.bind(this),
      ArrowDown: this.toggleMenuDown.bind(this),
    };
  }

  show() {
    this.setFirstFosus();
    this.busController.setBusListeners(this.eventsMethods);
    super.show();
    if (!this.rendered) {
      // render only one time, because menu is unchangeable
      this.render();
    }
  }

  hide() {
    super.hide();
  }

  start() {
    this.busController.setBusListeners(this.eventsMethods);
  }

  processLine() {
    this.stop();
    this.hide();
    const href = this.getFocus()[0].getAttribute('href');
    const params = this.getFocus()[0].getAttribute('params');

    this.busController.emit('link', href, params);
  }

  render(data) {
    super.render(data);
  }

  stop() {
    this.busController.removeBusListeners(this.eventsMethods);
  }

  getFocus() {
    return (this.wrapper.getElementsByClassName(this.focusClass));
  }

  setFirstFosus() {
    this.focus = this.wrapper.firstChild;
    this.focusElement(this.focus);
  }

  toggleMenuUp() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const previousSibling = focus.previousElementSibling;
    this.focusElement(previousSibling || this.wrapper.lastElementChild);
  }

  toggleMenuDown() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const nextSibling = focus.nextElementSibling;
    this.focusElement(nextSibling || this.wrapper.firstElementChild);
  }

  focusElement(element) {
    element.classList.add(this.focusClass);
  }
}
