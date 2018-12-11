import FrameView from '../frame/frame_view';
import BaseApp from '../base_app';

export default class GameApp extends BaseApp {
  constructor(url, parent, source) {
    super(url, parent, FrameView(source));
  }
}
