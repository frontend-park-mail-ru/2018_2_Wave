import AjaxModule from '../../modules/ajax';
import './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');

const leaderboardCallback = (response) => {
  response.json().then((data) => {
    console.log(data.total)

    root.innerHTML = leaderBoardTemplate({ 
      users: data.users,
      pagesCount: data.total,
    });
  });
};

export default function createLeaderboard() {
  const count = 5;
  const start = 0;
  AjaxModule.Get({
    callback: leaderboardCallback,
    path: `/users/${start}/${count}`,
  });
}
