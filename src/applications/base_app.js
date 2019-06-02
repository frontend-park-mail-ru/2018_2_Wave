import bus from '../modules/bus';

export default class BaseApp {
  /**
   * @param {string} appURL application id in appManager and its URL
   */
  constructor(appURL) {
    this.url = appURL;

    this.views = {};

    this.active = false;
    this.started = false;
  }

  // TODO: write this.
  processParams() {
    console.log('processing params');
    this.a = 0;
  }


  // launch(resource) {
  //   if (resource) this.animateLaunch(resource);
  //   else if (this.started) this.resume();
  //   else this.start();
  // }

  // animateLaunch(resource) {
  //   const {
  //     width,
  //     height,
  //     left,
  //     top,
  //   } = resource.getBoundingClientRect();

  //   const element = document.createElement('div');
  //   element.classList.add('floating');
  //   element.style.width = `${width}px`;
  //   element.style.height = `${height}px`;
  //   element.style.top = `${top}px`;
  //   element.style.left = `${left}px`;

  //   this.parent.appendChild(element);
  //   const widthScale = window.innerWidth / width;
  //   const heightScale = window.innerHeight / height;
  //   const translateX = (window.innerWidth / 2 - left - width / 2) / widthScale;
  //   const translateY = (window.innerHeight / 2 - top - height / 2) / heightScale;

  //   const launchAnimation = element.animate({
  //     transform: [
  //       'translate(0px, 0px)',
  //       `scale(${widthScale}, ${heightScale}) translate(${translateX}px, ${translateY}px)`,
  //     ],
  //     'border-radius': [
  //       '20px', '0px',
  //     ],
  //   }, {
  //     duration: 300,
  //     fill: 'forwards',
  //     easing: 'cubic-bezier(.36,1.08,.55,.93)',
  //   });
  //   launchAnimation.pause();

  //   launchAnimation.onfinish = () => {
  //     element.remove();
  //     if (this.started) this.resume();
  //     else this.start();
  //   };

  //   launchAnimation.play();

  //   const name = resource.getAttribute('name');
  //   console.log(name);
  //   setTimeout(() => bus.emit('addTile', name), 1000);
  // }

  start() {
    this.started = true;
    this.active = true;
  }

  stop() {
    this.started = false;
    this.active = false;
  }

  pause() {
    this.active = false;
  }

  resume() {
    if (!this.started) {
      this.start();
      return;
    }

    this.active = true;
  }
}
