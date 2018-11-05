import ajax from '../../modules/ajax';
import BaseView from '../baseview';
import './leaderboard.css';

const template = require('./leaderboard.pug');


export default class LeaderboardView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show({ page = 1, count = 1 } = {}) {
    super.show();
    this.render(page, count);
  }

  async render(page, count) {
    try {
      const data = await ajax.GET({
        path: `/users/${page}/${count}`,
      });
      console.log(data);
      super.render({
        users: data.users,
        pagesCount: (data.total / count),
      });
      const pagination = document.querySelector('.pagination');
      // pagination.addEventListener('click', (event) => {
      //   const link = event.target;
      //   getUsers(count * (link.getAttribute('page') - 1), count);
      // });
    } catch (error) {
      // TODO: show error
      console.error(error);
    }
  }
}
