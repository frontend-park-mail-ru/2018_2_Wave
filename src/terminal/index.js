import css from './css/index.css';
import busController from '../modules/busController';
import TerminalMenu from './components/terminalMenu/terminalMenu';
import TextInput from './utils/textInput/textInput';
import keyboardControler from '../modules/keyboardController';

const blockTemplate = require('./templates/block.pug');
const heartTemplate = require('./templates/heart.pug');

export default class Terminal {
  constructor(config) {
    [this.terminal] = document.getElementsByClassName('terminal');
    this.termBuffer = config.initialMessage || '';
    this.cwd = config.cwd || '~/';
    this.commandHistory = [];
    this.currentCommandIndex = 1;
    this.maxCommandHistory = config.maxCommandHistory || 100;

    this.busController = busController;

    this.HelpText = 'Available commands:\nmenu\nsnake\nclear\n\n';

    this.terminalCommands = {
      clear: this.clear.bind(this),
      fuck: this.clear.bind(this),
      help: this.help.bind(this),
      menu: this.terminalMenu.bind(this),
      snake: this.snake.bind(this),
      mainMenu: this.mainMenu.bind(this),
      love: this.love.bind(this),
      'show abs': this.showAbs.bind(this),
    };

    this.termControls = {
      Text: this.executeCommand.bind(this),
      ArrowUp: this.toggleUp.bind(this),
      ArrowDown: this.toggleDown.bind(this),
    };
    this.busController.setBusListeners(this.termControls);

    this.termCtrlControl = {
      'Ctrl+c': this.break.bind(this),
    };
    this.busController.setBusListeners(this.termCtrlControl);

    this.renderTerm(this.termBuffer);
  }

  getCommandIntro() {
    return `${this.cwd}:/$ `;
  }

  renderTerm(preText) {
    this.terminalAppendInnerHTML(blockTemplate({
      preText,
      leader: this.getCommandIntro(),

    }));
    this.textInput = new TextInput(this.busController);
    this.getTextInput().scrollIntoView();
  }

  break() {
    this.addCommandOut(`<div class='red'>\n     break</div>`);
    this.textInput.removeBell();
    this.busController.resetBusListeners(this.termCtrlControl);
    this.busController.setBusListeners(this.termControls);
    this.renderTerm();
  }

  showAbs() {
    this.addCommandOut(`<div class='red bold'><b>\n     NO</b></div>`);
    this.renderTerm();
  }

  mainMenu() {
    this.busController.emit('mainMenu');
  }

  love() {
    this.addCommandOut(heartTemplate());
    this.renderTerm();
  }


  clear() {
    this.terminal.innerHTML = '';
    this.renderTerm();
  }

  help() {
    this.setCommandOut(`<div class='leader'>${this.HelpText}</div>`);
    this.renderTerm();
  }

  snake() {
    this.busController.emit('snakeGame', {
      snakeText: this.getLastLineText(),
      snakeDOMRect: this.getLastLineCoordinates(),
    });
  }

  getLastLineText() {
    return `${this.getCommandIntro()}: snake`;
  }

  getLastLineCoordinates() {
    console.log(this.getLastLine().getBoundingClientRect());
    return this.getLastLine().getBoundingClientRect();
  }

  getLastLine() {
    const leaders = this.terminal.getElementsByClassName('leader');
    return leaders[leaders.length - 1];
  }

  terminalMenu() {
    this.textInput.removeBell();
    this.busController.removeBusListeners(this.termControls);

    this.terminalMenuControls = {
      terminalMenuClose: this.terminalMenuClose.bind(this),
    };
    this.busController.setBusListeners(this.terminalMenuControls);

    const _ = new TerminalMenu(this.getCommandOut(), this.busController);
  }

  terminalMenuClose(username) {
    if (username) {
      this.cwd = username;
    } else {
      this.cwd = 'unknown';
    }
    this.busController.removeBusListeners(this.terminalMenuControls);
    this.busController.setBusListeners(this.termControls);
    this.renderTerm();
  }

  /*----------------------------*/
  /* -------block----------------*/
  /*----------------------------*/
  getBlock() {
    const block = document.getElementsByClassName('terminal_block');
    return block[block.length - 1];
  }

  /* ----------------------------*/
  /* -------term-----------------*/
  /* ----------------------------*/

  terminalAppendInnerHTML(innerHTMLData) {
    this.terminal.innerHTML += innerHTMLData;
  }

  termAppendChild(child) {
    this.terminal.appendChild(child);
  }


  /* ----------------------------*/
  /* -------text-input-----------*/
  /* ----------------------------*/

  getTextInput() {
    return this.getBlock().getElementsByClassName('text-input')[0];
  }


  /* ----------------------------*/
  /* -------command-out----------*/
  /* ----------------------------*/

  getCommandOut() {
    return this.getBlock().getElementsByClassName('commandOut')[0];
  }

  setCommandOut(innerData) {
    this.getBlock().getElementsByClassName('commandOut')[0].innerHTML = innerData;
  }

  addCommandOut(innerData) {
    this.getBlock().getElementsByClassName('commandOut')[0].innerHTML += innerData;
  }

  addCommandOutClass(className) {
    this.getCommandOut().classList.add(className);
  }


  /* ----------------------------*/
  /* -----command-functions------*/
  /* ----------------------------*/

  isCommand(line) {
    return this.terminalCommands.hasOwnProperty(line);
  }

  runCommand(command, argc, argv) {
    return this.terminalCommands[command](argc, argv);
  }

  commandNotFound(command) {
    this.setCommandOut(`<span class="bold">\n${command}</span>:command not found\n\n`);
    this.renderTerm();
  }

  executeCommand() {
    const line = this.textInput.getText();

    const argv = line.split(' ');
    // const command = argv[0];
    const command = line;
    const argc = argv.length;

    argv.shift();

    if (command) {
      if (this.isCommand(command)) {
        this.runCommand(command, argc, argv);
      } else {
        this.commandNotFound(command, argc, argv);
      }
      this.addLineToHistory(line);
    }
  }

  addLineToHistory(line) {
    this.commandHistory.unshift(line);
    this.currentCommandIndex = -1;
    if (this.commandHistory.length > this.maxCommandHistory) {
      const diff = this.commandHistory.length - this.maxCommandHistory;
      this.commandHistory.splice(this.commandHistory.length - 1, diff);
    }
  }

  toggleCommandHistory(direction) {
    let lineBuffer;
    let newIndex = this.currentCommandIndex + direction;

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= this.commandHistory.length) newIndex = this.commandHistory.length - 1;

    if (newIndex !== this.currentCommandIndex) {
      this.currentCommandIndex = newIndex;
    }

    if (newIndex > -1) {
      // Change line to something from history.
      lineBuffer = this.commandHistory[newIndex];
    } else {
      // Blank line...
      lineBuffer = '';
    }
    this.textInput.setText(lineBuffer);
  }

  toggleUp() {
    this.toggleCommandHistory(1);
  }

  toggleDown() {
    this.toggleCommandHistory(-1);
  }
}
