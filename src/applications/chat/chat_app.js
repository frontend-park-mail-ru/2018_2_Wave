import BaseApp from '../base_app';
import ChatView from './views/chat';


export default class ChatApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, ChatView);
    this.chat = this.views.main;
  }

  start() {
    super.start();
    setTimeout(() => {
      this.chat.askForChats();
      console.log('hello');
    }, 2000);
  }
}
