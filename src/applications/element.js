export default class Element {
  constructor(template, parent, wrapper) {
    this.template = template;
    this.parent   = parent;
    this.wrapper = wrapper || document.createElement('div');
    this.wrapper.hidden = true;
    if (parent !== wrapper) {
      this.parent.appendChild(this.wrapper);
    }
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
  }
}
