/* eslint-disable no-param-reassign */
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
    const locales = ['RU', 'EN', 'DE'];
    locales.splice(locales.indexOf(locale), 1);

    const [locale1, locale2] = locales;

    super.render({
      locale1,
      locale2,
      locale,
      time,
    });

    [this.localeContainer] = this.wrapper.getElementsByClassName('locale-container');
    this.localeContainer.addEventListener(
      'click', this.processLangClick.bind(this), { once: true },
    );
  }

  processLangClick(ev) {
    if (ev.target.classList.contains('locale__possible')) {
      const newLang = ev.target.innerHTML;
      const oldLang = localeManager.locale;

      const buttons = this.wrapper.getElementsByClassName('locale');

      [...buttons].forEach((button) => {
        if ((button.innerHTML !== newLang)
        &&  (button.innerHTML !== oldLang)) {
          return;
        }

        button.classList.add('locale__clicked');
        button.addEventListener('transitionend', () => {
          button.innerHTML = button.innerHTML === newLang ? oldLang : newLang;
          button.classList.remove('locale__clicked');
        }, { once: true });
      });

      localeManager.locale = newLang;
    }

    setTimeout(() => {
      [this.localeContainer] = this.wrapper.getElementsByClassName('locale-container');
      this.localeContainer.addEventListener(
        'click', this.processLangClick.bind(this), { once: true },
      );
    }, 500);
  }
}
