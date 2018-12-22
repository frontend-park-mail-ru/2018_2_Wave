import Element from '../../../element';

import bus from '../../../../modules/bus';
import { getApp, addApp } from '../../../../modules/network';

import template from './description.pug';
import './description.pcss';


export default class Description extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('about', this.render.bind(this));

    this.wrapper.addEventListener('click', async (ev) => {
      console.log(ev.target);
      if (ev.target.classList.contains('add-button')) {
        const { err } = await addApp(this.shownApp.name);
        if (err) console.error(err);
        else {
          const element = ev.target;
          bus.emit('appInstalled');
          const firstAnimation = element.animate({
            color: [
              'rgba(100%, 100%, 100%, 0.8)',
              'rgba(100%, 100%, 100%, 0)',
            ],
          }, {
            duration: 200,
            fill: 'forwards',
            easing: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
          });
          firstAnimation.pause();
          firstAnimation.onfinish = () => {
            firstAnimation.onfinish = null;
            element.innerText = 'installed';
            element.classList.remove('add-button');
            firstAnimation.reverse();
          };
          firstAnimation.play();
        }
      }
    });

    this.render();
  }

  async render(appName) {
    if (appName) {
      const { err, app } = await getApp(appName);
      if (err) console.error(err);
      this.shownApp = app;
      super.render({ app });
      return;
    }

    this.shownApp = null;
    super.render();
  }
}
