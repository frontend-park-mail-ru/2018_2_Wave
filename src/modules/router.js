import bus from './bus';

/*                utils                */

/**  proceeds urlencoded params to array  */
function splitParams(string) {
  /* eslint-disable no-param-reassign */
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
  if (string === '/') return 'main';
  if (string) {
    path = string.slice(1);
  }
  if (path.slice(-1) === '/') return path.slice(0, -1);
  return path;
}

export default class Router {
  /**
   * @param {AppManager} appManager AppManager instance
   */
  constructor(appManager) {
    this.appManager = appManager;

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

    this.start = this.start.bind(this);
  }


  async start() {
    if (!this.appManager.started) {
      throw new Error('AppManager not started.');
    }

    this.openFromAddressBar();
    bus.listen('link', this.open.bind(this));

    this.listeners.forEach((listener) => {
      const { target, event, method } = listener;
      target.addEventListener(event, method);
    });
  }


  open(fullPath, paramString, target) {  // TODO: what is target?
    const path = clearPath(fullPath);  // aaaaa/bbbbbb/cccccc/dddddd
    const params = splitParams(paramString);  // {a=1, b=2}

    let appName, viewName;

    const preApp = path.indexOf('/') === -1
      ? path
      : path.substring(0, path.indexOf('/'));
    if (this.appManager.appExists(preApp)) {
      appName = preApp;
      viewName = path.indexOf('/') === -1
        ? ''
        : path.substring(path.indexOf('/') + 1);
    } else {
      appName = 'main';
      viewName = path;
    }

    this.appManager.openApp(appName, { view: viewName, params });

    // CHECK: replaceState if view or params list changed
    if (this.appManager.activeAppName !== appName) {
      window.history.pushState(null, '', fullPath);
    } else {
      window.history.replaceState(null, '', fullPath);
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
