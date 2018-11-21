import bus from './bus';


/*                utils                */

/**  proceeds path and urlencoded params
 *   to app name, view name and params array  */
function processPath(fullPath, params) {
  const result = {};

  let path = fullPath.slice(1);
  if (path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }

  if (params) {
    result.params = {};
    params
      .split('&', 5)
      .forEach((item) => {
        const [key, val] = item.split('=');
        result.params[key] = val;
      });
  }

  const separator = path.indexOf('/');
  if (separator !== -1) {
    result.app = path.slice(0, separator);
    result.view = path.slice(separator + 1);
  } else {
    result.app = path;
  }

  return result;
}


export default class Router {
  constructor(root) {
    this.routes = {};
    this.root = root;
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
    // TODO: create app object only when app opens
    this.routes[url] = app;
    return this;
  }


  open(path) {
    const { app: appName, view, params } = processPath(path);
    console.log({ appName, view, params });


    let app;
    if (!appName) app = this.routes['/'];
    else if (!this.routes.hasOwnProperty(appName)) {
      if (this.routes['/'].hasOwnProperty(app)) {

      }
      this.open('/');
      return;
    } else app = this.routes[appName];

    if (view) {
      if (app.views.hasOwnProperty(view)) {
        app.changeView(view, params);
      } else {
        this.open(appName);
        return;
      }
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


    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }


  start() {
    if (!this.routes.hasOwnProperty('/')) {
      throw new Error('No main app!');
    }

    const { pathname, search } = window.location;
    this.open(pathname, search);

    window.addEventListener(
      'popstate',
      () => this.open(pathname + (search || '')),
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
}
