import bus from './bus';

/*                utils                */

/**  proceeds urlencoded params to array  */
function splitParams(string) {
  if (!string) return null;
  const params = {};
  if (string[0] === '?') {
    string = string.slice(1);
  }
  string
    .split('&', 5)
    .forEach((item) => {
      const [key, val] = item.split('=');
      params[key] = val;
    });
  return params;
}

/**  removes slashes from path string  */
function clearPath(string) {
  let path;
  if (string === '/') return string;
  if (string) {
    path = string.slice(1);
  }
  if (path.slice(-1) === '/') return path.slice(0, -1);
  return path;
}


export default class Router {
  constructor(root, MainApp) {
    this.routes = {};
    this.root = root;

    this.mainApp = new MainApp('/', this.root);
    this.routes['/'] = this.mainApp;
    this.appContainer = this.mainApp.appContainer.screen;
    this.appBar = this.mainApp.bar;

    this.listeners = [
      {
        target: window,
        event: 'popstate',
        method: this.openFromAddressBar.bind(this),
      },
      {
        target: document,
        event: 'click',
        method: this.openClickedLink.bind(this),
      },
    ];
  }


  checkRegister(appUrl) {
    return appUrl in this.routes;
  }

  registerApp(url, App, source) {
    if (url === '/') {
      console.error('MainApp already registered');
      return this;
    }
    if (url in this.routes) {
      console.log('Url already set.');
      return false;
    }
    const app = new App(url, this.appContainer, source);
    app.setBar(this.appBar);
    this.routes[url] = app;
    return this;
  }


  start() {
    if (!this.routes.hasOwnProperty('/')) {
      throw new Error('No main app!');
    }

    this.mainApp.start();
    this.currentApp = this.mainApp;

    this.openFromAddressBar();
    bus.listen('link', this.open.bind(this));
    bus.listen('regApp', this.registerApp.bind(this));

    this.listeners.forEach((listener) => {
      const { target, event, method } = listener;
      target.addEventListener(event, method);
    });
  }


  open(fullPath, paramString, target) {
    const path = clearPath(fullPath);
    const params = splitParams(paramString);

    let app;
    if (this.routes.hasOwnProperty(path)) {
      app = this.routes[path];
      // if (app === this.mainApp) app.changeView('main', params);
      app.changeView('main', params);
    } else {
      Object.values(this.routes).forEach((foundApp) => {
        if (foundApp.views.hasOwnProperty(path)) {
          app = foundApp;
          app.changeView(path, params);
        }
      });
    }


    if (!app) {
      this.open('/');
      return;
    }

    if (!app.active) {
      this.currentApp.pause();
      this.currentApp = app;
      app.launch(target);
    }

    if (window.location.pathname !== fullPath) {
      window.history.pushState(null, '', fullPath);
    }
  }


  openFromAddressBar() {
    const { pathname, search } = window.location;
    this.open(pathname, search);
  }

  openClickedLink(event) {
    const target = event.target instanceof HTMLAnchorElement
      ? event.target
      : event.target.parentElement;

    if (target instanceof HTMLAnchorElement
    && (target.getAttribute('type') !== 'submit')) {
      event.preventDefault();
      if (target.pathname) {
        this.open(target.pathname, target.search, target);
      } else {
        const busEvent = target.getAttribute('event');
        if (busEvent) {
          bus.emit(busEvent);
        }
      }
    }
  }
}
