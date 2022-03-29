// const debounce = function debounce(func: Function, wait = 500, immediate = false) {
//   let timer = null;
//   let result;
//   return function proxy(...params) {
//     let self = this;
//     let callNow = !timer && immediate;
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       clearTimeout(timer);
//       timer = null;
//       if (!immediate) result = func.apply(self, params);
//     }, wait);
//     if (callNow) result = func.apply(self, params);
//     return result;
//   };
// };
