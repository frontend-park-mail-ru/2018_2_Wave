const menuTemplate = require('./templates/menu.pug');

export default class Menu {
  constructor(root, menuList, busController) {
    this.busController = busController;
    this.root = root;
    this.menuList = menuList;
    this.root.innerHTML = menuTemplate({
      menuList: this.menuList,
    });

    // listen events
    this.eventsMethods = {
      Tab: this.toggleMenuDown.bind(this),
      Enter: this.processLine.bind(this),
      ArrowUp: this.toggleMenuUp.bind(this),
      ArrowDown: this.toggleMenuDown.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethods);
  }

  getMenu() {
    return this.last(this.root.getElementsByClassName('menu'));
  }

  getFocus() {
    return this.last(this.root.getElementsByClassName('focus'));
  }

  processLine() {
    this.busController.removeBusListeners(this.eventsMethods);
    this.busController.emit(`${this.getFocus().getAttribute('datahref')}`);
  }

  toggleMenuUp() {
    const focus = this.getFocus();
    focus.classList.remove('focus');
    const previousSibling = focus.previousElementSibling;
    this.focusElement(previousSibling || this.getMenu().lastElementChild);
  }

  toggleMenuDown() {
    const focus = this.getFocus();
    focus.classList.remove('focus');
    const nextSibling = focus.nextElementSibling;
    this.focusElement(nextSibling || this.getMenu().firstElementChild);
  }

  focusElement(element) {
    element.classList.add('focus');
  }

  last(array) {
    return array[array.length -1];
  }
}
