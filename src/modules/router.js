import bus from './bus';


export default class Router {
  constructor(root) {
    this.routes = {};
    this.root = root;

    this.enviromentElem = document.createElement('div');
    this.enviromentElem.classList.add('enviroment');
    this.root.appendChild(this.enviromentElem);

    this.contentElem = document.createElement('div');
    this.contentElem.classList.add('content');
    this.root.appendChild(this.contentElem);
  }


  setEnviroment(View) {
    this.enviroment = new View(this.enviromentElem);
    return this;
  }

  register(path, View) {
    this.routes[path] = new View(this.root);
    return this;
  }


  open(path) {
    const openingView = this.routes[path.split('?', 1)];
    const params = {};
    window.location.search
      .substr(1)
      .split('&', 5)
      .forEach((item) => {
        const [key, val] = item.split('=');
        params[key] = val;
      });

    if (!openingView) {
      this.open('/');
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    if (!openingView.active) {
      Object.values(this.routes).forEach((view) => {
        if (view.active) view.hide();
      });

      if (Object.prototype.hasOwnProperty.call(this, 'enviroment')) {
        if (openingView.single) this.enviroment.hide();
        else                    this.enviroment.show();
      }

      openingView.show(params);
    }

    this.routes[path] = openingView;
  }


  start() {
    this.open(window.location.pathname);

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)
      || (event.target.getAttribute('type') === 'submit')) {
        return;
      }
      event.preventDefault();

      const link = event.target;
      this.open(link.pathname);
    });

    window.addEventListener(
      'popstate',
      () => this.open(window.location.pathname),
    );

    bus.listen('link', this.open.bind(this));
  }
}
