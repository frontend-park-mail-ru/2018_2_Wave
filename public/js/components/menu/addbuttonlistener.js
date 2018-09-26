export default function addButtonListener(id, func) {
  const menuButton = document.getElementById(id);
  if (menuButton == null) {
    return;
  }

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    func();
  });
}
