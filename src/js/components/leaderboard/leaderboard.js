import AjaxModule from '../../modules/ajax';
import './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');


const leaderboardCallback = (response) => {
  const count = 2;

  response.json().then((data) => {
    root.innerHTML = leaderBoardTemplate({ 
      users: data.users,
      pagesCount: (data.total / count),
    });
    const pagination = root.querySelector('.pagination');
    pagination.addEventListener('click', (event) => {    
      const link = event.target;
      getUsers(count * (link.getAttribute('page') - 1), count);
    });
  });
};

function getUsers(start, count) {
  AjaxModule.Get({
    callback: leaderboardCallback,
    path: `/users/${start}/${count}`,
  });
}

export default function createLeaderboard() {
  const count = 2;
  const start = 0;
  getUsers(start, count);
}
