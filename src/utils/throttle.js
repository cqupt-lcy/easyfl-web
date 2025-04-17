// utils/throttle.js
export function throttle(fn, delay = 1000) {
  let lastCall = 0;
  let lastResult;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      lastResult = fn.apply(this, args);
    }
    return lastResult;
  };
}
