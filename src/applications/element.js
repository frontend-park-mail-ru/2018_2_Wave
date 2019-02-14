/**
 * Deprecated stuff saved for backward compatibility
 * Please do not use it
 * @deprecated
 */
export default class Element {
  constructor(template, parent, wrapper, wrapperClass) {
    this.template = template;
    this.parent   = parent;

    if (!wrapper) {
      this.wrapper = document.createElement('div');
    } else {
      this.wrapper = wrapper;
    }

    // sure?
    if (wrapperClass) {
      this.wrapper.classList.add(...wrapperClass);
    }
    // sure?

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
    this.wrapper.style.setProperty('display', 'none', 'important');
  }

  show() {
    if (!this.rendered) this.render();
    this.wrapper.hidden = false;
    this.wrapper.style.display = null;
  }

  render(data) {
    this.wrapper.innerHTML = this.template(data || null);
  }
}
