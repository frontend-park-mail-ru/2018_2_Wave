import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './home.pug';
import '../../components/app_tile/app_tile.pcss';
import './home.pcss';

import '../../../../../static/img/terminal.jpg';
import '../../../../../static/img/snake.jpg';
import '../../../../../static/img/igor.png';

const apps = [
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
  {
    link: '/chunk',
    image: '/img/igor.png',
    name: 'Chunk',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
];


export default class HomeView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Home';

    [this.panel] = this.wrapper.getElementsByClassName('home-page__tile-panel');

    this.startScroller();
  }

  startScroller() {
    let lastLeft = Date.now();
    let lastRight = Date.now();
    document.addEventListener('keydown', (ev) => {
      if (ev.which === 37 || ev.which === 39) ev.preventDefault();
      if (ev.which === 39 && (Date.now() - lastLeft) > 400) {
        this.scrollPanelLeft();
        lastLeft = Date.now();
      } else if (ev.which === 37 && (Date.now() - lastRight) > 400) {
        this.scrollPanelRight();
        lastRight = Date.now();
      }
    });
  }

  scrollPanelLeft() {
    const [tile] = this.panel.children;
    this.panel.scrollLeft += tile.offsetWidth;
  }

  scrollPanelRight() {
    const [tile] = this.panel.children;
    this.panel.scrollLeft -= tile.offsetWidth;
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('home-page__grid')) {
      grid.classList.add('home-page__grid');
    }
    super.show();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('home-page__grid')) {
      grid.classList.remove('home-page__grid');
    }
    super.hide();
  }

  render() {
    if (this.panel.innerHTML !== '') return;
    apps.forEach((app) => {
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }
}
