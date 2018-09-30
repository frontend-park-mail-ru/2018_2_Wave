const settingsTemplate = require('./settings.pug');

const root = document.getElementById('root');


export default function createSettings() {
  root.innerHTML = settingsTemplate();

  console.log('settings block created');
}
