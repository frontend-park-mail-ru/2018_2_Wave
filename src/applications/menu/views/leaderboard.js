import { getLeaders } from '../../modules/network';
import BaseView from '../../baseview';
import './leaderboard.css';

const template = require('./leaderboard.pug');


export default class LeaderboardView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  // TODO: FIXME: check order!!!
  async render(count, page) {
    const { err, leaders } = getLeaders(count, page);
    if (err) {
      // TODO: show error
      console.error(err);
      return;
    }
    super.render({
      users: leaders,
      // pagesCount: (data.total / count),
    });
    // const pagination = document.querySelector('.pagination');
    // pagination.addEventListener('click', (event) => {
    //   const link = event.target;
    // getUsers(count * (link.getAttribute('page') - 1), count);
    // });
  }
}
