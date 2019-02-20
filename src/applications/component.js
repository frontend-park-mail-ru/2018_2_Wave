export default class Component {
  /**
   *Creates an instance of Component.
   * @param {Component|HTMLElement} parent Parent component or HTMLElement
   * @param {String} markTag Tag name in parent, which will be replaced
   * @memberof Component
   */
  constructor({
    template,
    parent,
    markTag,
  }) {
    this.rendered = false;
    this.hidden = true;

    this.template = template;
    this.parent   = parent;
    this.markTag  = markTag  || null;

    if (this.parent instanceof Component) {
      this.parent.addChild(markTag, this);
    }

    this.body = null;
    this.children = {};
  }


  addChild(name, component) {
    if (component.parent !== this) {
      return { err: new Error('Invalid parent') };
    }
    this.children[name] = component;
    return true;
  }


  /**
   * Creates and returns render promise of this component,
   * but not its children.
   * @memberof Component
   */
  render() {
    this.renderPromise = this._render_();
    return this.renderPromise;
  }


  hide() {
    this.body.hidden = true;
    this.body.style.setProperty('display', 'none', 'important');

    this.hidden = true;
  }

  async show(showChildren = true) {
    if (!this.rendered) {
      // here should be skeleton
      if (!this.renderPromise) this.render();
      await this.renderPromise;
    }

    this.body.hidden = false;
    this.body.style.display = null;

    this.hidden = false;

    if (showChildren) {
      Object
        .values(this.children)
        .forEach((child) => {
          child.show();
        });
    }
  }


  async _render_() {
    /* eslint-disable no-unused-expressions */
    const needToRender = await this._prepareRender_();

    if (!needToRender) return;

    const bodyString = this.template(this.data || null);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = bodyString;
    const newBody = wrapper.firstChild;

    if (this.hidden) {
      newBody.hidden = true;
      newBody.style.setProperty('display', 'none', 'important');
    }

    if (this.body === null) {
      this.DOMparent = (this.parent instanceof HTMLElement)
        ? this.parent
        : this.parent.body;

      if (this.markTag) {
        [this.body] = this.DOMparent.getElementsByTagName(this.markTag);
        this.DOMparent.replaceChild(newBody, this.body);
      } else {
        this.DOMparent.appendChild(newBody);
      }
    } else {
      this.DOMparent.replaceChild(newBody, this.body);
    }

    this.body = newBody;

    this.rendered = true;
  }


  async _prepareRender_() {
    if ('getData' in this) this.dataPromise = this.getData();

    Object
      .values(this.children)
      .forEach(child => child.render());

    if (this.parent instanceof Component) {
      await this.parent.renderPromise;
    }

    if (this.dataPromise) {
      const newData = await this.dataPromise;
      if (newData === this.data) return false;
      this.data = newData;
      return true;
    }

    if ('getData' in this || !this.rendered) {
      return true;
    }
    return false;
  }
}
