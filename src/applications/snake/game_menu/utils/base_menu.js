import busController from '../../modules/busController';
import Element from '../../../element';

export default class BaseMenu extends Element {
  constructor(parent, template, containerName) {
    super(template, parent);
    this.firstFocus = undefined;
    this.busController = busController;
    this.containerName = containerName;
    this.focusClass = 'snakemenu-button_focus';

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

  hide() {
    super.hide();
  }

  start() {
    [this.parent] = this.parent.getElementsByClassName(this.containerName);
    this.setFirstFosus();
    this.busController.setBusListeners(this.eventsMethods);
  }

  processLine() {
    this.stop();
    this.hide();
    const datahref = this.getFocus()[0].getAttribute('datahref');

    this.busController.emit(`MENU_${datahref}`, datahref);
  }

  render() {
    super.render();
  }

  stop() {
    this.busController.removeBusListeners(this.eventsMethods);
  }

  getFocus() {
    return (this.parent.getElementsByClassName(this.focusClass));
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
