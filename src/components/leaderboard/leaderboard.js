import AjaxModule from '../../modules/ajax';
import './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');


function getUsers(start, count) {
  AjaxModule.Get({
    path: `/users/${start}/${count}`,
    callback: {
      success: (data) => {
        root.innerHTML = leaderBoardTemplate({
          users: data.users,
          pagesCount: (data.total / count),
        });
        const pagination = root.querySelector('.pagination');
        pagination.addEventListener('click', (event) => {
          const link = event.target;
          getUsers(count * (link.getAttribute('page') - 1), count);
        });
      },
    },
  });
}

export default function createLeaderboard() {
  const start = 0;
  const count = 2;
  getUsers(start, count);
}
