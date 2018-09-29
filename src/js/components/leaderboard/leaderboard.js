const leaderBoardTemplate = require('./leaderboard.pug');

const root = document.getElementById('root');


export default function createLeaderboard() {
  root.innerHTML = leaderBoardTemplate();

  console.log('leaderboard block created');
}
