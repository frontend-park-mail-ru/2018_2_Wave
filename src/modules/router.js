import bus from './bus';


/*                utils                */

/**  proceeds path and urlencoded params
 *   to app name, view name and params array  */
function processPath(fullPath) {
  const result = {};
  let [path, params] = fullPath.split('?');

  path = path.slice(1);
  if (fullPath.slice(-1) === '/') {
    console.log('removing last');
    path = path.slice(0, -1);
  }

  if (params) {
    const paramPairs = params.split('&', 5);
    params = {};
    paramPairs.forEach((item) => {
      const [key, val] = item.split('=');
      params[key] = val;
    });
    result.params = params;
  }

  const separator = path.indexOf('/');
  if (separator !== -1) {
    const app = path.slice(0, separator);
    const view = path.slice(separator + 1);
    result.app = app;
    result.view = view;
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

    let app;
    if (!appName) app = this.routes['/'];
    else if (!this.routes.hasOwnProperty(appName)) {
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

    this.open(
      window.location.pathname
      + window.location.search,
    );

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)
      || (event.target.getAttribute('type') === 'submit')) {
        return;
      }
      event.preventDefault();

      const link = event.target;
      this.open(link.pathname + link.params);
    });

    window.addEventListener(
      'popstate',
      () => this.open(
        window.location.pathname
        + window.location.search,
      ),
    );

    bus.listen('link', this.open.bind(this));
  }
}
