export default class BaseView {
  constructor(template, parent) {
    this.template = template;
    this.parent   = parent;
    this.wrapper  = document.createElement('div');
    this.wrapper.hidden = true;
    // this.isPage = true;
    // // has url and isn't enviromental block
  }


  get active() {
    return !this.wrapper.hidden;
  }

  get rendered() {
    return !(this.wrapper.innerHTML === '');
  }


  hide() {
    this.wrapper.hidden = true;
  }

  show() {
    this.wrapper.hidden = false;
    if (!this.rendered) this.render();
  }


  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
    this.parent.appendChild(this.wrapper);
  }
}
