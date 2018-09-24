export default function addButtonListener (id, func) {
  const menuButton = document.getElementById(id);
  if (menuButton == null) {
    return;
  }

  menuButton.addEventListener('click', function (event) {
    event.preventDefault();
    func();
  });
}
