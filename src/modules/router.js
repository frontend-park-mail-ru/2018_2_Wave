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
  if (string === '/') return string;
  const path = string.slice(1);
  if (path.slice(-1) === '/') return path.slice(0, -1);
  return path;
}


export default class Router {
  constructor(root, MainApp) {
    this.routes = {};
    this.root = root;

    this.mainApp = new MainApp('/', this.root);
    this.routes['/'] = this.mainApp;
    this.appContainer = this.mainApp.appContainer.wrapper;

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


  registerApp(url, App, source) {
    const app = new App(url, this.appContainer, source);
    if (url === '/') {
      console.error('MainApp already registered');
      return this;
    }
    this.routes[url] = app;
    return this;
  }


  start() {
    if (!this.routes.hasOwnProperty('/')) {
      throw new Error('No main app!');
    }

    this.mainApp.start();

    this.openFromAddressBar();
    bus.listen('link', this.open.bind(this));

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

    // let app;
    // if (this.routes.hasOwnProperty(path)) {
    //   app = this.routes[path];
    //   if (app === this.mainApp) app.changeView('main', params);
    // } else if (this.mainApp.views.hasOwnProperty(path)) {
    //   app = this.mainApp;
    //   app.changeView(path, params);
    // } else {
    //   this.open('/');
    //   return;
    // }

    if (!app) {
      this.open('/');
      return;
    }

    this.currentApp = app;

    if (!app.active) {
      Object.values(this.routes).forEach((knownApp) => {
        if (knownApp.active) knownApp.pause();
      });
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
      this.open(target.pathname, target.search, target);
    }
  }
}
