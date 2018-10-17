export default class BaseView {
  constructor(template, parent) {
    this.template = template;
    this.parent   = parent;
    this.wrapper  = document.createElement('div');
  }

  hide() {
    this.wrapper.display = 'none';
  }

  show() {
    this.wrapper.display = 'block';
  }

  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
    this.parent.appendChild(this.wrapper);
  }
}
