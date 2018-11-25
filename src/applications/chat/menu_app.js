import BaseApp from '../base_app';

import ChatView from './views/chat';


export default class ChatApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, ChatView);
  }

  
}
