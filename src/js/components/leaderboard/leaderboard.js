import AjaxModule from '../../modules/ajax';
import './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');


const leaderboardCallback = (response) => {
  response.json().then((users) => {
    root.innerHTML = leaderBoardTemplate({ 
      users,
    });
    const pagination = root.querySelector('.pagination');
    pagination.addEventListener('click', (event) => {    
      const link = event.target;
      const count = 2;
      getUsers(count, count * link.getAttribute('page'));
    });
  });
};

function getUsers(count, start) {
  AjaxModule.Get({
    callback: leaderboardCallback,
    path: `/users/${strat}/${count}`,
  });
}

export default function createLeaderboard() {
  const count = 2;
  const start = 0;
  getUsers(coun, start);
}
