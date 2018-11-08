export default () => {
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`]
      || window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

  // полифилы

  if (!window.requestAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = (callback, element) => {
      const currTime = new Date().getTime();


      const timeToCall = Math.max(0, 16 - (currTime - lastTime));


      const id = window.setTimeout(_ => callback(currTime + timeToCall), timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }


  if (!window.cancelAnimationFrame) { window.cancelAnimationFrame = id => clearTimeout(id); }
};
