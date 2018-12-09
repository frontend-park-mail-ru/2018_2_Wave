import busController from '../../modules/busController';
import Element from '../../../element';

export default class BaseMenu extends Element {
  constructor(template, parent, wrapper, isHorizontal, menuClass) {
    super(template, parent, wrapper);
    this.firstFocus = undefined;
    this.menuClass = menuClass;
    this.busController = busController;
    this.focusClass = 'snakemenu-button_focus';

    if (isHorizontal) {
      this.eventsMethods = {
        Tab: this.toggleMenuDown.bind(this),
        Enter: this.processLine.bind(this),
        ArrowLeft: this.toggleMenuUp.bind(this),
        ArrowRight: this.toggleMenuDown.bind(this),
      };
    } else {
      this.eventsMethods = {
        Tab: this.toggleMenuDown.bind(this),
        Enter: this.processLine.bind(this),
        ArrowUp: this.toggleMenuUp.bind(this),
        ArrowDown: this.toggleMenuDown.bind(this),
      };
    }
  }

  show() {
    if (this.menuClass) {
      [this.menu] = this.parent.getElementsByClassName(this.menuClass);
    } else {
      this.menu = this.wrapper;
    }
    this.setFirstFosus();
    this.busController.setBusListeners(this.eventsMethods);
    super.show();
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
    return (this.menu.getElementsByClassName(this.focusClass));
  }

  setFirstFosus() {
    this.focus = this.menu.firstChild;
    this.focusElement(this.focus);
  }

  toggleMenuUp() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const previousSibling = focus.previousElementSibling;
    this.focusElement(previousSibling || this.menu.lastElementChild);
  }

  toggleMenuDown() {
    const [focus] = this.getFocus();
    focus.classList.remove(this.focusClass);
    const nextSibling = focus.nextElementSibling;
    this.focusElement(nextSibling || this.menu.firstElementChild);
  }

  focusElement(element) {
    element.classList.add(this.focusClass);
  }
}
