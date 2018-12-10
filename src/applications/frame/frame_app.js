import BaseApp from '../base_app';
import FrameView from './frame_view';

import './styles/frame.css';

export default class FrameApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, FrameView);
  }
}
