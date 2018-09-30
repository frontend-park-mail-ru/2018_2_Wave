import AjaxModule from '../../modules/ajax';
import css from './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');

const leaderboardCallback = (xhr) => {
  const users = JSON.parse(xhr.responseText);
  root.innerHTML = leaderBoardTemplate({
    users,
  });
};

export default function createLeaderboard() {
  AjaxModule.doGet({
    callback: leaderboardCallback,
    path: '/users',
  });
}
