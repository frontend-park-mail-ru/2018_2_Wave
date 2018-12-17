import busController from '../../modules/busController';
import Element from '../../../element';

import config from '../../modules/view_config';

import style from './base_menu.pcss';

export default class BaseMenu extends Element {
  constructor(template, parent, wrapper, isHorizontal, menuClass) {
    super(template, parent, false, wrapper);
    this.firstFocus = undefined;
    this.menuClass = menuClass;
    this.busController = busController;

    if (isHorizontal) {
      this.eventsMethods = {
        Tab: this.toggleMenuDown.bind(this),
        Enter: this.processLine.bind(this),
        ArrowLeft: this.toggleMenuUp.bind(this),
        ArrowRight: this.toggleMenuDown.bind(this),
        Backspace: this.goBack,
      };
    } else {
      this.eventsMethods = {
        Tab: this.toggleMenuDown.bind(this),
        Enter: this.processLine.bind(this),
        ArrowUp: this.toggleMenuUp.bind(this),
        ArrowDown: this.toggleMenuDown.bind(this),
        Backspace: this.goBack,
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
    this.setBusListeners();
  }

  hide() {
    this.removeBusListeners();
    super.hide();
  }

  setBusListeners() {
    this.busController.setBusListeners(this.eventsMethods);
  }

  removeBusListeners() {
    this.busController.removeBusListeners(this.eventsMethods);
  }

  start() {
    this.setBusListeners();
  }

  processLine() {
    this.stop();
    this.hide();
    const href = this.getFocus()[0].getAttribute('href');
    if (href) {
      const params = this.getFocus()[0].getAttribute('params');
      this.busController.emit('link', href, params);
    } else {
      const event = this.getFocus()[0].getAttribute('event');
      this.busController.emit(event);
    }
  }

  render(data) {
    if (this.rendered) return;
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
    this.focusElement(this.focus);
  }

  toggleMenuUp() {
    const [focus] = this.getFocus();
    focus.classList.remove(config.snakemenuButtonFocus);
    const previousSibling = focus.previousElementSibling;
    this.focusElement(previousSibling || this.menu.lastElementChild);
  }

  toggleMenuDown() {
    const [focus] = this.getFocus();
    focus.classList.remove(config.snakemenuButtonFocus);
    const nextSibling = focus.nextElementSibling;
    this.focusElement(nextSibling || this.menu.firstElementChild);
  }

  removeFocusElements() {
    const focus = this.menu.getElementsByClassName(config.snakemenuButtonFocus);
    for (let i = focus.length - 1; i >= 0; i -= 1) {
      focus[i].classList.remove(config.snakemenuButtonFocus);
    }
  }

  focusElement(element) {
    this.removeFocusElements();
    element.classList.add(config.snakemenuButtonFocus);
  }


  goBack(link) {
    busController.emit('link', link);
  }
}
