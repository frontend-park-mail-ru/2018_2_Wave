import busController from '../../modules/busController';
import Element from '../../../element';

import config from '../../modules/view_config';

import style from './base_menu.css';

export default class BaseMenu extends Element {
  constructor(template, parent, wrapper, isHorizontal, menuClass) {
    super(template, parent, wrapper);
    this.firstFocus = undefined;
    this.menuClass = menuClass;
    this.busController = busController;

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
    super.show();
    this.setFirstFosus();
    this.busController.setBusListeners(this.eventsMethods);
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
    return (this.menu.getElementsByClassName(config.snakemenuButtonFocus));
  }

  setFirstFosus() {
    this.focus = this.menu.firstChild;
    BaseMenu.focusElement(this.focus);
  }

  toggleMenuUp() {
    const [focus] = this.getFocus();
    focus.classList.remove(config.snakemenuButtonFocus);
    const previousSibling = focus.previousElementSibling;
    BaseMenu.focusElement(previousSibling || this.menu.lastElementChild);
  }

  toggleMenuDown() {
    const [focus] = this.getFocus();
    focus.classList.remove(config.snakemenuButtonFocus);
    const nextSibling = focus.nextElementSibling;
    BaseMenu.focusElement(nextSibling || this.menu.firstElementChild);
  }

  static focusElement(element) {
    element.classList.add(config.snakemenuButtonFocus);
  }
}
