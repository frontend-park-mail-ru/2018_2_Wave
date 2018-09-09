const createBlock = document.querySelector('.create');
const loginBlock = document.querySelector('.login');
const leaderBoard = document.querySelector('div .leaderboard');
const menu = document.querySelector('.menu');
const gameRulesBlock = document.querySelector('.gamerules');
const settingsBlock = document.querySelector('.settings');
const profileBlock = document.querySelector('.profile');

const backButton = document.querySelector('.back');


show(loginBlock);
hide(createBlock);
hide(leaderBoard);
hide(gameRulesBlock);
hide(profileBlock);
hide(settingsBlock);
hide(backButton);


const loginLink  = loginBlock.querySelector('.message a');
const createLink = createBlock.querySelector('.message a');

function changeBlocks() {
    isHide(loginBlock) ? show(loginBlock) : hide(loginBlock);
    isHide(createBlock) ? show(createBlock) : hide(createBlock);
}

loginLink.addEventListener('click', changeBlocks);
createLink.addEventListener('click', changeBlocks);


const loginButton = loginBlock.querySelector('button');
const createButton = createBlock.querySelector('button');


loginButton.addEventListener('click', goToMenu);
createButton.addEventListener('click', goToMenu);

function goToMenu() {
    hide(document.querySelector('.register-form'));
    show(menu);
}


// menu buttons

const leaderBoardButton = menu.querySelector('.leaderboard_button');
const profileButton = menu.querySelector('.profile_button');
const settingsButton = menu.querySelector('.settings_button');


function showMeAndHideMenu(element) {
    return function () {
        hide(menu);
        show(element);
        show(backButton);
        backButton.addEventListener('click', hideMeAndShowMenu(element));
    }
}

function hideMeAndShowMenu(element) {
    return function(){
        hide(element);
        hide(backButton);
        show(menu);
    }
}


leaderBoardButton.addEventListener('click', showMeAndHideMenu(leaderBoard));
profileButton.addEventListener('click', showMeAndHideMenu(profileBlock));
settingsButton.addEventListener('click', showMeAndHideMenu(settingsBlock));


function isHide(element) {
    return element.style.display  == 'none';
}

function hide(element) {
    element.style.display  = 'none';
}

function show(element) {
    element.style.display  = 'block';
}
