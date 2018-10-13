import ajax from '../../modules/ajax';
import './leaderboard.css';

const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');


async function getUsers(start, count) {
  try {
    const data = await ajax.GET({
      path: `/users/${start}/${count}`,
    });
    root.innerHTML = leaderBoardTemplate({
      users: data.users,
      pagesCount: (data.total / count),
    });
    const pagination = root.querySelector('.pagination');
    pagination.addEventListener('click', (event) => {
      const link = event.target;
      getUsers(count * (link.getAttribute('page') - 1), count);
    });
  } catch (error) {
    // TODO: show error
    console.log(error);
  }
}

export default function createLeaderboard() {
  const start = 0;
  const count = 2;
  getUsers(start, count);
}
