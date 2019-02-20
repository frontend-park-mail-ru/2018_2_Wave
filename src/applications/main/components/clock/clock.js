import Component from '../../../component';


import template from './clock.pug';
import './clock.pcss';


export default class Clock extends Component {
  constructor(parent, markTag) {
    super({ template, parent, markTag });

    const date = new Date();
    const timeout = (60 - date.getSeconds()) * 1000;
    setTimeout(() => {
      this.updateTime();
      if (this.rendered) super.render();
      setInterval(() => {
        this.updateTime();
        if (this.rendered) super.render();
      }, 60000);
    }, timeout);

    this.updateTime();
  }

  updateTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    this.timeString = `${hours}:${(minutes < 10) ? 0 : ''}${minutes}`;
  }

  getData() {
    return { timeString: this.timeString };
  }
}
