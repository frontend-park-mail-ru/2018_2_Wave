export default class Element {
  constructor(template, parent, wrapper) {
    this.template = template;
    this.parent   = parent;
    if (!wrapper) {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('wrapper');
    } else {
      this.wrapper = wrapper;
    }
    // this.wrapper = wrapper || document.createElement('div');
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
    this.wrapper.style.setProperty('display', 'none', '!important');
    this.wrapper.style.visibility = 'hidden';
  }

  show() {
    if (!this.rendered) this.render();
    this.wrapper.hidden = false;
    this.wrapper.style.display = '';
    // this.wrapper.style.visibility = 'visible';
  }


  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
  }
}
