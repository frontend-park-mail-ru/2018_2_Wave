const createBlock = document.querySelector('.create');
const loginBlock = document.querySelector('.login');
const leaderBoard = document.querySelector('div .leaderboard');
const menu = document.querySelector('.menu');
const gameRulesBlock = document.querySelector('.gamerules');
const settingsBlock = document.querySelector('.settings');
const profileBlock = document.querySelector('.profile');


show(loginBlock);
hide(createBlock);
hide(leaderBoard);
hide(gameRulesBlock);
hide(profileBlock);
hide(settingsBlock);


const loginLink  = loginBlock.querySelector('.message a');
const createLink = createBlock.querySelector('.message a');

function changeBlocks() {
	isHide(loginBlock) ? show(loginBlock) : hide(loginBlock);
	isHide(createBlock) ? show(createBlock) : hide(createBlock);
};

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


const leaderBoardButton = menu.querySelector('.leaderboard_button');
const profileButton = menu.querySelector('.profile_button');


leaderBoardButton.addEventListener('click', () => {
	hide(menu);
	show(leaderBoard);
});

profileButton.addEventListener('click', () => {
	hide(menu);
	show(profileBlock);
});















function isHide(element) {
	return element.style.display  == 'none';
}

function hide(element) {
	element.style.display  = 'none';
}

function show(element) {
	element.style.display  = 'block';
}


