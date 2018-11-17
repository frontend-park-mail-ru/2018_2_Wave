export default class BaseView {
  constructor(template, parent) {
    this.template = template;
    this.parent   = parent;
    this.wrapper  = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.wrapper.hidden = true;
    this.single = false;
    // if true, we hide all other views when this one is active
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
    if (!this.rendered) {
      // TODO: show skeleton:
      // t.me/uxlive/6566
      this.render();
    }
  }


  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
    this.parent.appendChild(this.wrapper);
  }
}
