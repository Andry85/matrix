let total = 0;

var matrix = (function setMatrix() {
  let array = [];
  for (let i = 0; i < 5; i++) {
    array[i] = [];
    for (let j = 0; j < 5; j++) {
      array[i][j] = {
        value: Math.floor(Math.random() * 1000),
        isActive: ''
      };
      total = total + array[i][j].value;
    }
  }
  return array;
})();

export const INITIAL_STATE = {
    matrix,
    isvisible: [],
    total
};