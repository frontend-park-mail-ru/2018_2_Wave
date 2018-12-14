export default class BaseApp {
  constructor(appURL, parent, MainView, Views) {
    this.url = appURL;
    this.parent = parent;
    this.views = { main: new MainView(parent) };
    this.currentView = this.views.main;

    if (Views) {
      Object.keys(Views).forEach((key) => {
        this.views[key] = new Views[key](parent);
      });
    }

    this.active = false;
    this.started = false;
  }


  changeView(viewUrl, params) {
    // write view change animations in overridden method
    // do not forget to call super.changeView() first!
    if (!this.views.hasOwnProperty(viewUrl)) {
      console.error('No such view');
      this.currentView = this.views.main;
    } else {
      this.currentView.hide();
      this.currentView = this.views[viewUrl];
    }

    this.currentView.render(params);
    if (this.active) this.currentView.show();
  }

  launch(resource) {
    if (resource) {
      this.animateLaunch(resource);
      return;
    }
    if (this.started) this.resume();
    else this.start();
  }

  animateLaunch(resource) {
    const {
      width,
      height,
      left,
      top,
    } = resource.getBoundingClientRect();

    const element = document.createElement('div');
    element.classList.add('floating');
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    this.parent.appendChild(element);
    const widthScale = window.innerWidth / width;
    const heightScale = window.innerHeight / height;
    const translateX = (window.innerWidth / 2 - left - width / 2) / widthScale;
    const translateY = (window.innerHeight / 2 - top - height / 2) / heightScale;

    const launchAnimation = element.animate({
      transform: [
        'scale(1, 1) translate(0px, 0px)',
        `scale(${widthScale}, ${heightScale}) translate(${translateX}px, ${translateY}px)`,
      ],
    }, {
      duration: 300,
      fill: 'forwards',
    });

    launchAnimation.onfinish = () => {
      element.remove();
      if (this.started) this.resume();
      else this.start();
    };
  }

  start() {
    this.started = true;
    this.active = true;
    this.currentView.show();
  }

  stop() {
    this.started = false;
    this.active = false;
    this.currentView.hide();
    this.parent.innerHTML = '';
  }

  pause() {
    this.parent.style.background = 'none';
    this.active = false;
    this.currentView.hide();
  }

  resume() {
    if (!this.started) {
      this.start();
      return;
    }
    this.active = true;
    this.currentView.show();
  }
}
