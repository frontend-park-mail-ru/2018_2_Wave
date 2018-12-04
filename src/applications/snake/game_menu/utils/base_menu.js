import busController from '../../modules/busController';
import Element from '../../../element';

export default class BaseMenu extends Element {
  constructor(parent, focusClass, template) {
    super(template, parent);
    this.focusClass = focusClass;
    this.firstFocus = undefined;
    this.busController = busController;

    this.eventsMethods = {
      Tab: this.toggleMenuDown.bind(this),
      Enter: this.processLine.bind(this),
      ArrowUp: this.toggleMenuUp.bind(this),
      ArrowDown: this.toggleMenuDown.bind(this),
    };
  }

  show() {
    super.show();
  }

  start() {
    [this.parent] = this.parent.getElementsByClassName('main-menu');
    this.setFirstFosus();
    this.busController.setBusListeners(this.eventsMethods);
  }

  processLine() {
    this.stop();
    this.busController.emit(`${this.getFocus().getAttribute('datahref')}`, []);
  }

  render() {
    super.render();
  }

  stop() {
    this.busController.removeBusListeners(this.eventsMethods);
  }

  getFocus() {
    return this.parent.getElementsByClassName(this.focusClass);
  }

  setFirstFosus() {
    this.focus = this.parent.firstChild;
    this.focusElement(this.focus);
  }

  toggleMenuUp() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const previousSibling = focus.previousElementSibling;
    this.focusElement(previousSibling || this.parent.lastElementChild);
  }

  toggleMenuDown() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const nextSibling = focus.nextElementSibling;
    this.focusElement(nextSibling || this.parent.firstElementChild);
  }

  focusElement(element) {
    element.classList.add(this.focusClass);
  }
}
