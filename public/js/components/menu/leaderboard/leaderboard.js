import createMenu from '../menu/menu';
import addButtonListener from '../addbuttonlistener';

import leaderBoardTemplate from './leaderboard.pug';

export default function leaderboard() {
  root.innerHTML = leaderBoardTemplate();
  addButtonListener('menuButton', createMenu);

  console.log('leaderboard block created');
}
