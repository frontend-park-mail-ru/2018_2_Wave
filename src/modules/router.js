import bus from './bus';


export default class Router {
  constructor(root) {
    this.routes = {};
    this.root = root;
  }


  register(path, View) {
    this.routes[path] = new View(this.root);
    return this;
  }


  open(path) {
    const currentView = this.routes[path];

    if (!currentView) {
      this.open('/');
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    if (!currentView.active) {
      Object.values(this.routes).forEach((view) => {
        if (view.active) view.hide();
      });
      currentView.show();
    }

    this.routes[path] = currentView;
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

      console.log({ pathname: link.pathname });
      this.open(link.pathname);
    });

    window.addEventListener(
      'popstate',
      () => this.open(window.location.pathname),
    );

    bus.listen('link', this.open.bind(this));
  }
}
