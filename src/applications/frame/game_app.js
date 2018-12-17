import FrameView from './components/frame_view';
import BaseApp from '../base_app';

export default class GameApp extends BaseApp {
  constructor(url, parent, source) {
    super(url, parent);
    const wrapper = document.createElement('div');
    wrapper.classList.add('game-wrapper');
    this.views.main = new FrameView(parent, wrapper, source);
    this.currentView = this.views.main;
  }
}
