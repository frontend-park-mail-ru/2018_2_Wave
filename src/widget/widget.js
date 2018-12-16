import css from './widget.css';
import widgetTemplate from './templates/widgetTemplate.pug';


if (window.location !== window.parent.location) {
  // The page is in an iframe
} else {
  document.body.innerHTML += widgetTemplate();
  const [movable] = document.getElementsByClassName('movable');

  const [dragArae] =  movable.getElementsByClassName('drag-area');
  
  dragArae.onmousedown = (e) => {
    const [blank_iframe] = document.getElementsByClassName('blank_iframe');
    blank_iframe.style.display = 'block';
    e.preventDefault();
    const coords = getCoords(movable);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    movable.style.position = 'absolute';
    // document.body.appendChild(movable);
    moveAt(e);

    movable.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {
      const left = e.pageX - shiftX;
      if (left > 0) {
        movable.style.left = `${left}px`;
      }
      const top = e.pageY - shiftY;
      if (top < window.innerHeight - movable.offsetHeight) {
        movable.style.top = `${top}px`;
      }
    }

    document.onmousemove = function (e) {
      e.preventDefault();
      moveAt(e);
    };

    const mouseUp = (e) => {
      blank_iframe.style.display = 'none';
      if (e.pageX > window.innerWidth / 2) {
        // movable.classList.add('chat-move');
        movable.style.left = `${window.innerWidth - movable.offsetWidth}px`;
      } else {
        movable.style.left = 0;
      }
      document.onmousemove = null;
      movable.onmouseup = null;
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mouseup', mouseUp);
  };


  dragArae.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  const [chat_tab_wrap] = document.getElementsByClassName('chat_tab_wrap');

  chat_tab_wrap.onclick = (e) => {
    e.preventDefault();
    if (movable.style.visibility === 'hidden') {
      movable.style.visibility = 'visible';
    } else {
      movable.style.visibility = 'hidden';
    }
  };
}
