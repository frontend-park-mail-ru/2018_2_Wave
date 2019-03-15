import Element from '../../../element';

import bus from '../../../../modules/bus';
import localeManager from '../../../../modules/locale';

// import { getApp, addApp } from '../../../../modules/network';

import template from './formAboutUs.pug';
import './formAboutUs.pcss';


export default class FormAboutUs extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    this.render = this.render.bind(this);

    bus.listen('about', this.render);
    bus.listen('localeChanged', this.render);

    this.render();
  }

  render() {
    let text = 'Place for your feedback and suggestions for new games';
    const { locale } = localeManager;

    if (locale === 'RU') {
      text = 'Здесь вы можете отправить отзыв или предложить новую игру для платформы';
    } else if (locale === 'DE') {
      text = 'Hier können Sie Feedback senden oder ein neues Spiel für die Plattform vorschlagen';
    }

    super.render({ text });
  }
}
