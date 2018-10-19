export default class BaseView {
  constructor(template, parent) {
    this.template = template;
    this.parent   = parent;
    this.wrapper  = document.createElement('div');
    this.wrapper.hidden = true;
  }

  hide() {
    this.wrapper.hidden = true;
  }

  show() {
    // if (this.wrapper.innerHTML === '') {
    //   // TODO: show skeleton
    // }
    this.wrapper.hidden = false;
  }

  get active() {
    return !this.wrapper.hidden;
  }

  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
    this.parent.appendChild(this.wrapper);
  }
}
