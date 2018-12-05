export default class Element {
  constructor(template, parent, wrapper) {
    this.template = template;
    this.parent   = parent;
    if (wrapper) {
      this.wrapper = wrapper;
    } else {
      this.wrapper  = document.createElement('div');
    }
    this.wrapper.hidden = true;
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
