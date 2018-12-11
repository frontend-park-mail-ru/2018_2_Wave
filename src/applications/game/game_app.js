import FrameView from '../frame/frame_view';
import BaseApp from '../base_app';

export default class GameApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, FrameView);
  }

  specify(source) {
    this.currentView.draw(source);
  }
}
