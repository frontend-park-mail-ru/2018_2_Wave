import localeManager from '../../../../modules/locale';

import Element from '../../../element';


import template from './icon-block.pug';
import './icon-block.pcss';


export default class IconBlock extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    this.render();

    const date = new Date();
    const timeout = (60 - date.getSeconds()) * 1000;
    setTimeout(() => {
      this.render();
      setInterval(() => this.render(), 60000);
    }, timeout);
  }

  render() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${(minutes < 10) ? 0 : ''}${minutes}`;

    const { locale } = localeManager;

    super.render({ locale, time });

    [this.localeButton] = this.wrapper.getElementsByClassName('locale');
    this.localeButton.onclick = () => {
      // TODO: change locale in manager here
      this.localeButton.classList.add('locale__clicked');
      this.localeButton.addEventListener('transitionend', () => {
        if (this.localeButton.innerHTML === 'DE') {
          this.localeButton.innerHTML = 'EN';
        } else {
          this.localeButton.innerHTML = 'DE';
        }
        this.localeButton.classList.remove('locale__clicked');
      }, { once: true });
    };
  }
}
