export default function addButtonListener (id, func) {
	// проверочку бы
	const menuButton = document.getElementById(id);

	menuButton.addEventListener('click', function (event) {
		event.preventDefault();
		func();
	});
}