export default class FullScreen {
  static set() {
    if (!((window.fullScreen)
     || (window.innerWidth === screen.width && window.innerHeight === screen.height)
     || (!window.screenTop && !window.screenY))) {
      if (window.requestFullscreen) {
        window.requestFullscreen();
      } else if (window.mozRequestFullScreen) {
        window.mozRequestFullScreen();
      } else if (window.webkitRequestFullscreen) {
        window.webkitRequestFullscreen();
      }
    }
  }
}
