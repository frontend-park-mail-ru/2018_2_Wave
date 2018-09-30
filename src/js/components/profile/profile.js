const profileTemplate = require('./profile.pug');

const root = document.getElementById('root');


export default function createProfile() {
  root.innerHTML = profileTemplate();
}
