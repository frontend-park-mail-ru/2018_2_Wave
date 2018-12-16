export default class FullScreen {
  static set() {
    if (!((window.fullScreen)
     || (window.innerWidth === screen.width && window.innerHeight === screen.height)
     || (!window.screenTop && !window.screenY))) {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if (document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
      } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
      }
    }
  }
}
