import bus from './bus';


/*                utils                */

/**  proceeds urlencoded params to array  */
function splitParams(string) {
  if (!string) return null;
  const params = {};
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
  constructor(root) {
    this.routes = {};
    this.root = root;
  }


  start() {
    if (!this.routes.hasOwnProperty('/')) {
      throw new Error('No main app!');
    }

    const { pathname, search } = window.location;
    this.open(pathname, search);

    window.addEventListener(
      'popstate', () => this.open(pathname, search),
    );

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)
      || (event.target.getAttribute('type') === 'submit')) {
        return;
      }
      event.preventDefault();

      const link = event.target;
      this.open(link.pathname, link.search);
    });

    bus.listen('link', this.open.bind(this));
  }


  open(fullPath, paramString) {
    const path = clearPath(fullPath);
    const params = splitParams(paramString);

    let app;
    if (this.routes.hasOwnProperty(path)) {
      app = this.routes[path];
      if (app === this.mainApp) app.changeView('main', params);
    } else if (this.mainApp.views.hasOwnProperty(path)) {
      app = this.mainApp;
      app.changeView(path, params);
    } else {
      this.open('/');
    }

    if (!app.active) {
      Object.values(this.routes).forEach((knownApp) => {
        // TODO: make array of active apps
        // TODO: check for main app, never pause it
        // TODO: stop old apps
        if (knownApp.active) knownApp.pause();
      });
      if (!app.started) app.start();
      else app.resume();
    }

    if (window.location.pathname !== fullPath) {
      window.history.pushState(null, '', fullPath);
    }
  }


  // TODO: write this method
  // TODO: grant some previleges to main app
  // TODO: get wrapper-div from main app

  // setMainApp(App) {
  //   this.enviroment = new View(this.enviromentElem);
  //   return this;
  // }

  registerApp(url, App) {
    const app = new App(url, this.root);
    if (url === '/') this.mainApp = app;
    // TODO: create app object only when app opens
    this.routes[url] = app;
    return this;
  }
}
