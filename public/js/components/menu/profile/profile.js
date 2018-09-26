import createMenu from '../menu/menu';
import addButtonListener from '../addbuttonlistener';

const profileTemplate = require('./profile.pug');

export default function createProfile() {
  root.innerHTML = profileTemplate();
  addButtonListener('menuButton', createMenu);

  console.log('profile block created');
}
